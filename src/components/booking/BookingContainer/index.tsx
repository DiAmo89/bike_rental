"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BookingForm from "../BookingForm";
import OrderSummary from "../OrderSummary";
import PaymentSection from "../PaymentSection";

import { bookingSchema } from "@/lib/schemas/auth-schema";
import SuccessModal from "../SuccessModal";

interface BookingContainerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bike: any;
}

export default function BookingContainer({ bike }: BookingContainerProps) {
  const router = useRouter();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dbAccessories, setDbAccessories] = useState<any[] | null>(null);
  const [options, setOptions] = useState<Record<string, boolean>>({});

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const calculateFinalPrice = () => {
    const isDatesValid =
      startDate && endDate && new Date(endDate) > new Date(startDate);
    if (!isDatesValid) return "0.00";

    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffInMs = end.getTime() - start.getTime();
    const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)) || 1;

    const pricePerDay = Number(bike?.pricePerDay) || 0;
    const serviceFee = 5.0;

    const accessoriesTotal = (dbAccessories || []).reduce((accSum, acc) => {
      if (options[acc.id]) {
        return accSum + Number(acc.pricePerDay || 0) * days;
      }
      return accSum;
    }, 0);

    const subtotal = pricePerDay * days + accessoriesTotal;
    const tax = subtotal * 0.1;
    const total = subtotal + serviceFee + tax;

    return total.toFixed(2);
  };

  useEffect(() => {
    const checkAvailability = async () => {
      if (startDate && endDate && new Date(endDate) > new Date(startDate)) {
        setIsCheckingAvailability(true);
        try {
          const res = await fetch(
            `/api/booking/create?bikeId=${bike.id}&startDate=${startDate}&endDate=${endDate}`,
          );
          const data = await res.json();

          if (!data.available) {
            setIsAvailable(false);
            setErrors((prev) => ({
              ...prev,
              server: [
                "This bike is already booked for these dates. Please choose others.",
              ],
            }));
          } else {
            setIsAvailable(true);
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors.server;
              return newErrors;
            });
          }
        } catch (err) {
          console.error("Availability check failed:", err);
        } finally {
          setIsCheckingAvailability(false);
        }
      }
    };

    checkAvailability();
  }, [startDate, endDate, bike.id]);

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

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
    } else if (name === "expiryDate") {
      let cleanValue = value.replace(/\D/g, "");
      if (cleanValue.length >= 1 && parseInt(cleanValue[0]) > 1)
        cleanValue = "0" + cleanValue;
      if (cleanValue.length >= 2) {
        const month = parseInt(cleanValue.substring(0, 2));
        if (month > 12) cleanValue = "12" + cleanValue.substring(2);
        if (cleanValue.substring(0, 2) === "00")
          cleanValue = "01" + cleanValue.substring(2);
        formattedValue =
          cleanValue.substring(0, 2) +
          (cleanValue.length > 2 ? "/" + cleanValue.substring(2, 4) : "");
      } else {
        formattedValue = cleanValue;
      }
    } else if (name === "cvc") {
      formattedValue = value.replace(/\D/g, "");
    }

    setCardData((prev) => ({ ...prev, [name]: formattedValue }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      const cardValidationErrors: string[] = [];

      if (name === "cardNumber") {
        const digitsOnly = formattedValue.replace(/\D/g, "");
        if (digitsOnly.length === 16 && /^0+$/.test(digitsOnly)) {
          cardValidationErrors.push("Card number cannot consist of only zeros");
        }
      }
      if (name === "cvc" && formattedValue === "000") {
        cardValidationErrors.push("Invalid CVC code (cannot be 000)");
      }
      if (name === "expiryDate" && formattedValue.length === 5) {
        const expiryParts = formattedValue.split("/");
        const month = parseInt(expiryParts[0], 10);
        const year = parseInt("20" + expiryParts[1], 10);
        const now = new Date();
        if (month < 1 || month > 12)
          cardValidationErrors.push("Invalid month (01-12)");
        else if (
          year < now.getFullYear() ||
          (year === now.getFullYear() && month < now.getMonth() + 1)
        ) {
          cardValidationErrors.push("Card has expired");
        }
      }

      if (cardValidationErrors.length > 0)
        newErrors.card = cardValidationErrors;
      else if (["expiryDate", "cardNumber", "cvc"].includes(name))
        delete newErrors.card;

      return newErrors;
    });
  };

  useEffect(() => {
    fetch("/api/actions-accessory")
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
    const validation = bookingSchema.safeParse({
      ...contactData,
      startDate,
      endDate,
    });

    if (!validation.success) {
      setErrors((prev) => ({
        ...prev,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(validation.error.flatten().fieldErrors as any),
      }));
      setIsLoading(false);
      return;
    }

    if (paymentMethod === "card") {
      const cardErrors: string[] = [];
      const cardDigits = cardData.cardNumber.replace(/\s/g, "");
      if (cardDigits.length < 16 || /^0+$/.test(cardDigits))
        cardErrors.push("Invalid card number");
      if (cardData.cvc.length < 3 || cardData.cvc === "000")
        cardErrors.push("Invalid CVC");

      if (cardErrors.length > 0) {
        setErrors((prev) => ({ ...prev, card: cardErrors }));
        setIsLoading(false);
        return;
      }
    }

    const finalPrice = calculateFinalPrice();
    const selectedAccessoryIds = Object.keys(options).filter(
      (id) => options[id],
    );

    try {
      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validation.data,
          bikeId: bike.id,
          totalPrice: finalPrice,
          paymentMethod,
          bookingAccessories: selectedAccessoryIds,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setIsAvailable(false);
          throw new Error(
            result.error || "This bike is already booked for these dates.",
          );
        }
        throw new Error(result.error || "Booking failed");
      }

      setShowSuccess(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, server: [err.message] }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => router.push("/user-profile")}
      />

      <div className="lg:col-span-2 space-y-12">
        {errors.server && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-shake">
            ⚠️ {errors.server[0]}
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

        <PaymentSection
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          cardData={cardData}
          onCardChange={handleCardChange}
          errors={errors}
        />
      </div>

      <div className="lg:col-span-1">
        <OrderSummary
          bike={bike}
          startDate={startDate}
          endDate={endDate}
          options={options}
          dbAccessories={dbAccessories}
          onConfirm={handleConfirmOrder}
          isLoading={isLoading || isCheckingAvailability}
        />
        {!isAvailable && startDate && endDate && (
          <p className="mt-4 text-center text-xs text-red-500 font-bold uppercase tracking-wider">
            ❌ This bike is already reserved for those dates!
          </p>
        )}
      </div>
    </div>
  );
}
