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

      if (cleanValue.length >= 1) {
        const firstDigit = parseInt(cleanValue[0]);
        if (firstDigit > 1) {
          cleanValue = "0" + cleanValue;
        }
      }

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

      if (name === "expiryDate" && formattedValue.length === 5) {
        const expiryParts = formattedValue.split("/");
        const month = parseInt(expiryParts[0], 10);
        const year = parseInt("20" + expiryParts[1], 10);

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        if (month < 1 || month > 12) {
          cardValidationErrors.push("Invalid month (01-12)");
        } else if (year < currentYear) {
          cardValidationErrors.push("Card has expired (year in the past)");
        } else if (year === currentYear && month < currentMonth) {
          cardValidationErrors.push("Card has expired (month in the past)");
        }
      }

      if (cardValidationErrors.length > 0) {
        newErrors.card = cardValidationErrors;
      } else if (
        name === "expiryDate" ||
        name === "cardNumber" ||
        name === "cvc"
      ) {
        delete newErrors.card;
      }

      return newErrors;
    });
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

    const validation = bookingSchema.safeParse({
      ...contactData,
      startDate,
      endDate,
    });

    if (!validation.success) {
      setErrors((prev) => ({
        ...prev,
        ...(validation.error.flatten().fieldErrors as Record<string, string[]>),
      }));
      setIsLoading(false);
      return;
    }

    if (paymentMethod === "card") {
      const cardErrors: string[] = [];
      const expiryParts = cardData.expiryDate.split("/");

      if (cardData.cardNumber.replace(/\s/g, "").length < 16)
        cardErrors.push("Invalid card number");
      if (expiryParts.length !== 2 || cardData.expiryDate.length !== 5) {
        cardErrors.push("Expiry date must be MM/YY");
      } else {
        const month = parseInt(expiryParts[0], 10);
        const year = parseInt("20" + expiryParts[1], 10);
        const now = new Date();
        if (
          year < now.getFullYear() ||
          (year === now.getFullYear() && month < now.getMonth() + 1)
        ) {
          cardErrors.push("Card has expired");
        }
      }
      if (cardData.cvc.length < 3) cardErrors.push("Invalid CVC");

      if (cardErrors.length > 0) {
        setErrors((prev) => ({ ...prev, card: cardErrors }));
        setIsLoading(false);
        return;
      }
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
          paymentMethod,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Booking failed");

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
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import BookingForm from "../BookingForm";
// import OrderSummary from "../OrderSummary";
// import PaymentSection from "../PaymentSection";

// import { bookingSchema } from "@/lib/schemas/auth-schema";
// import SuccessModal from "../SuccessModal";

// interface BookingContainerProps {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   bike: any;
// }

// export default function BookingContainer({ bike }: BookingContainerProps) {
//   const router = useRouter();

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [dbAccessories, setDbAccessories] = useState<any[] | null>(null);
//   const [options, setOptions] = useState<Record<string, boolean>>({});

//   const [errors, setErrors] = useState<Record<string, string[]>>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const [contactData, setContactData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [cardData, setCardData] = useState({
//     cardNumber: "",
//     expiryDate: "",
//     cvc: "",
//   });

//   const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setContactData((prev) => ({ ...prev, [name]: value }));

//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     let formattedValue = value;

//     if (name === "cardNumber") {
//       formattedValue = value
//         .replace(/\D/g, "")
//         .replace(/(.{4})/g, "$1 ")
//         .trim();
//     } else if (name === "expiryDate") {
//       let cleanValue = value.replace(/\D/g, "");

//       if (cleanValue.length >= 1) {
//         const firstDigit = parseInt(cleanValue[0]);
//         if (firstDigit > 1) {
//           cleanValue = "0" + cleanValue;
//         }
//       }

//       if (cleanValue.length >= 2) {
//         const month = parseInt(cleanValue.substring(0, 2));
//         if (month > 12) cleanValue = "12" + cleanValue.substring(2);
//         if (cleanValue.substring(0, 2) === "00")
//           cleanValue = "01" + cleanValue.substring(2);

//         formattedValue =
//           cleanValue.substring(0, 2) +
//           (cleanValue.length > 2 ? "/" + cleanValue.substring(2, 4) : "");
//       } else {
//         formattedValue = cleanValue;
//       }
//     } else if (name === "cvc") {
//       formattedValue = value.replace(/\D/g, "");
//     }

//     setCardData((prev) => ({ ...prev, [name]: formattedValue }));

//     if (errors.card) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors.card;
//         return newErrors;
//       });
//     }
//   };

//   useEffect(() => {
//     fetch("/api/actions-accessory/read-all-accessories")
//       .then((res) => res.json())
//       .then((data) => {
//         setDbAccessories(data);
//         const initialOptions: Record<string, boolean> = {};
//         data.forEach(
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           (acc: any) => {
//             initialOptions[acc.id] = false;
//           },
//         );
//         setOptions(initialOptions);
//       });
//   }, []);

//   const handleConfirmOrder = async () => {
//     setIsLoading(true);
//     setErrors({});

//     const validation = bookingSchema.safeParse({
//       ...contactData,
//       startDate,
//       endDate,
//     });

//     if (!validation.success) {
//       setErrors(
//         validation.error.flatten().fieldErrors as Record<string, string[]>,
//       );
//       setIsLoading(false);
//       return;
//     }

//     if (paymentMethod === "card") {
//       const cardErrors: string[] = [];

//       if (cardData.cardNumber.replace(/\s/g, "").length < 16) {
//         cardErrors.push("Invalid card number");
//       }

//       const expiryParts = cardData.expiryDate.split("/");
//       if (expiryParts.length !== 2 || cardData.expiryDate.length !== 5) {
//         cardErrors.push("Expiry date must be MM/YY");
//       } else {
//         const month = parseInt(expiryParts[0], 10);
//         const year = parseInt("20" + expiryParts[1], 10);

//         const now = new Date();
//         const currentYear = now.getFullYear();
//         const currentMonth = now.getMonth() + 1;

//         if (month < 1 || month > 12) {
//           cardErrors.push("Invalid month (01-12)");
//         } else if (year < currentYear) {
//           cardErrors.push("Card has expired (year in the past)");
//         } else if (year === currentYear && month < currentMonth) {
//           cardErrors.push("Card has expired (month in the past)");
//         }
//       }

//       if (cardData.cvc.length < 3) {
//         cardErrors.push("Invalid CVC");
//       }

//       if (cardErrors.length > 0) {
//         setErrors((prev) => ({ ...prev, card: cardErrors }));
//         setIsLoading(false);
//         return;
//       }
//     }

//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const days = Math.max(
//       Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
//       1,
//     );

//     const accessoriesPrice = (dbAccessories || []).reduce((sum, acc) => {
//       return options[acc.id] ? sum + Number(acc.pricePerDay) * days : sum;
//     }, 0);

//     const finalPrice = (
//       Number(bike.pricePerDay) * days +
//       accessoriesPrice +
//       5
//     ).toFixed(2);

//     try {
//       const response = await fetch("/api/booking/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...validation.data,
//           bikeId: bike.id,
//           totalPrice: finalPrice,
//           paymentMethod,
//         }),
//       });

//       const result = await response.json();
//       if (!response.ok) throw new Error(result.error || "Booking failed");

//       setShowSuccess(true);
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       setErrors({ server: [err.message] });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//       <SuccessModal
//         isOpen={showSuccess}
//         onClose={() => router.push("/user-profile")}
//       />

//       <div className="lg:col-span-2 space-y-12">
//         {errors.server && (
//           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
//             {errors.server[0]}
//           </div>
//         )}

//         <BookingForm
//           startDate={startDate}
//           setStartDate={setStartDate}
//           endDate={endDate}
//           setEndDate={setEndDate}
//           options={options}
//           setOptions={setOptions}
//           dbAccessories={dbAccessories}
//           contactData={contactData}
//           setContactData={handleContactChange}
//           errors={errors}
//         />

//         <PaymentSection
//           paymentMethod={paymentMethod}
//           setPaymentMethod={setPaymentMethod}
//           cardData={cardData}
//           onCardChange={handleCardChange}
//           errors={errors}
//         />
//       </div>

//       <div className="lg:col-span-1">
//         <OrderSummary
//           bike={bike}
//           startDate={startDate}
//           endDate={endDate}
//           options={options}
//           dbAccessories={dbAccessories}
//           onConfirm={handleConfirmOrder}
//           isLoading={isLoading}
//         />
//       </div>
//     </div>
//   );
// }
