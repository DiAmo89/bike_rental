"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BookingForm from "../BookingForm";
import OrderSummary from "../OrderSummary";
import PaymentSection from "../PaymentSection";
import { bookingSchema } from "@/lib/schemas/auth-schema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingContainer({ bike }: { bike: any }) {
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dbAccessories, setDbAccessories] = useState<any[] | null>(null);
  const [options, setOptions] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  useEffect(() => {
    fetch("/api/actions-accessory/read-all-accessories")
      .then((res) => res.json())
      .then((data) => {
        setDbAccessories(data);
        const initialOptions: Record<string, boolean> = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.forEach((acc: any) => {
          initialOptions[acc.id] = false;
        });
        setOptions(initialOptions);
      });
  }, []);

  const handleConfirmOrder = async () => {
    setIsLoading(true);
    setErrors({});

    const validation = bookingSchema.safeParse({
      ...contactData,
      startDate,
      endDate,
    });

    if (!validation.success) {
      setErrors(
        validation.error.flatten().fieldErrors as Record<string, string[]>,
      );
      setIsLoading(false);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
      1,
    );

    const accessoriesPrice = (dbAccessories || []).reduce((sum, acc) => {
      return options[acc.id] ? sum + Number(acc.pricePerDay) * days : sum;
    }, 0);

    const finalPrice = (
      Number(bike.pricePerDay) * days +
      accessoriesPrice +
      5
    ).toFixed(2);

    try {
      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validation.data,
          bikeId: bike.id,
          totalPrice: finalPrice,
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Booking failed");

      router.push("/user-profile?success=true");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrors({ server: [err.message] });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-12">
        {errors.server && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            {errors.server[0]}
          </div>
        )}
        <BookingForm
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          options={options}
          setOptions={setOptions}
          dbAccessories={dbAccessories}
          contactData={contactData}
          setContactData={handleContactChange}
          errors={errors}
        />
        <PaymentSection />
      </div>
      <div className="lg:col-span-1">
        <OrderSummary
          bike={bike}
          startDate={startDate}
          endDate={endDate}
          options={options}
          dbAccessories={dbAccessories}
          onConfirm={handleConfirmOrder}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
