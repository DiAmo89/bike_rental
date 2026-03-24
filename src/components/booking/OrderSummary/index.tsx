"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function OrderSummary({
  bike,
  startDate,
  endDate,
  options,
  dbAccessories,
  onConfirm,
  isLoading,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const pricePerDay = Number(bike?.pricePerDay) || 0;
  const serviceFee = 5.0;

  const isDatesValid =
    startDate && endDate && new Date(endDate) > new Date(startDate);

  const calculateDays = () => {
    if (!isDatesValid) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffInMs = end.getTime() - start.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays >= 1 ? diffInDays : 0;
  };

  const days = calculateDays();

  const accessoriesTotal = (dbAccessories || []).reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (accSum: number, acc: any) => {
      if (options[acc.id]) {
        return accSum + Number(acc.pricePerDay || 0) * days;
      }
      return accSum;
    },
    0,
  );

  const subtotal = pricePerDay * days + accessoriesTotal;
  const tax = subtotal * 0.1;
  const total = isDatesValid ? subtotal + serviceFee + tax : 0;

  return (
    <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition-colors">
      <h2 className="text-xl font-bold mb-6 text-zinc-900">Order Summary</h2>

      <div className="flex gap-4 mb-6 border-b border-zinc-100 pb-6">
        <div className="relative h-16 w-20 overflow-hidden rounded-lg bg-zinc-100">
          <Image
            src={bike?.image || "/images/categories/mensclothing.jpg"}
            alt={typeof bike?.brand === "string" ? bike.brand : "Bike"}
            fill
            className="object-contain p-1"
          />
        </div>
        <div>
          <h4 className="font-semibold text-zinc-900 text-sm">
            {(bike?.brand as string) || "Bike"}{" "}
            {(bike?.model as string) || "Model"}
          </h4>
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
            {typeof bike?.category === "string"
              ? bike.category
              : "Professional Bike"}
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6 border-b border-zinc-100 pb-6 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-500">Rental duration:</span>
          <span className="font-bold text-zinc-900">
            {days} {days === 1 ? "day" : "days"}
          </span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-zinc-400 italic">Pick-up:</span>
          <span className="text-zinc-600">
            {startDate ? new Date(startDate).toLocaleDateString() : "---"}
          </span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-zinc-400 italic">Return:</span>
          <span className="text-zinc-600">
            {endDate ? new Date(endDate).toLocaleDateString() : "---"}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-6 text-sm">
        <div className="flex justify-between text-zinc-600">
          <span>Base Rental</span>
          <span className="font-medium text-zinc-900">
            €{(pricePerDay * days).toFixed(2)}
          </span>
        </div>

        {(dbAccessories || []).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any) => {
            if (options[acc.id]) {
              return (
                <div
                  key={acc.id}
                  className="flex justify-between text-zinc-600"
                >
                  {/* Безпечний вивід назви аксесуара */}
                  <span>
                    {typeof acc.name === "string" ? acc.name : "Accessory"}
                  </span>
                  <span className="font-medium text-zinc-900">
                    €{(Number(acc.pricePerDay || 0) * days).toFixed(2)}
                  </span>
                </div>
              );
            }
            return null;
          },
        )}

        <div className="flex justify-between text-zinc-600">
          <span>Service Fee</span>
          <span className="font-medium text-zinc-900">
            €{isDatesValid ? serviceFee.toFixed(2) : "0.00"}
          </span>
        </div>

        <div className="flex justify-between text-zinc-600">
          <span>Tax (10%)</span>
          <span className="font-medium text-zinc-900">€{tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-zinc-900 pt-4 mb-6">
        <span className="text-lg font-bold text-zinc-900">Total</span>
        <span className="text-2xl font-black text-black">
          €{total.toFixed(2)}
        </span>
      </div>

      <Button
        onClick={onConfirm}
        disabled={!isDatesValid || isLoading}
        className={`w-full font-bold py-6 rounded-xl transition-all duration-300 uppercase tracking-widest text-xs shadow-lg 
          ${
            !isDatesValid
              ? "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
              : "bg-[#e6ff2a] hover:bg-black hover:text-[#e6ff2a] text-black shadow-[#e6ff2a]/20"
          }`}
      >
        {isLoading
          ? "Processing..."
          : isDatesValid
            ? "Confirm & Pay"
            : "Select Rental Dates"}
      </Button>

      <p className="text-[10px] text-zinc-400 text-center mt-4 uppercase tracking-tighter">
        Secure checkout powered by Stripe
      </p>
    </div>
  );
}
