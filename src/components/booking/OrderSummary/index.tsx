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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const pricePerDay = Number(bike.pricePerDay) || 0;
  const serviceFee = 5.0;

  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMs = end.getTime() - start.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays > 0 ? diffInDays : 1;
  };

  const days = calculateDays();

  const accessoriesTotal = (dbAccessories || []).reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (accSum: number, acc: any) => {
      if (options[acc.id]) {
        return accSum + Number(acc.pricePerDay) * days;
      }
      return accSum;
    },
    0,
  );

  const subtotal = pricePerDay * days + accessoriesTotal;
  const tax = subtotal * 0.1;
  const total = subtotal + serviceFee + tax;

  return (
    <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md">
      <h2 className="text-xl font-bold mb-6 text-zinc-900">Order Summary</h2>

      <div className="flex gap-4 mb-6 border-b border-zinc-100 pb-6">
        <div className="relative h-16 w-20 overflow-hidden rounded-lg bg-zinc-100">
          <Image
            src={bike.image || "/images/categories/mensclothing.jpg"}
            alt={bike.brand}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h4 className="font-semibold text-zinc-900 text-sm">
            {bike.brand} {bike.model}
          </h4>
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
            {bike.category || "Professional Bike"}
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
            {startDate ? new Date(startDate).toLocaleString() : "---"}
          </span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-zinc-400 italic">Return:</span>
          <span className="text-zinc-600">
            {endDate ? new Date(endDate).toLocaleString() : "---"}
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
                  <span>{acc.name}</span>
                  <span className="font-medium text-zinc-900">
                    €{(Number(acc.pricePerDay) * days).toFixed(2)}
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
            €{serviceFee.toFixed(2)}
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
        className="w-full bg-[#e6ff2a] hover:bg-black hover:text-[#e6ff2a] text-black font-bold py-6 rounded-xl transition-all duration-300 uppercase tracking-widest text-xs shadow-lg shadow-[#e6ff2a]/20"
      >
        Confirm & Pay
      </Button>

      <p className="text-[10px] text-zinc-400 text-center mt-4 uppercase tracking-tighter">
        Secure checkout powered by Stripe
      </p>
    </div>
  );
}
