"use client";

import { CreditCard, Wallet, ShieldCheck } from "lucide-react";

interface PaymentSectionProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  cardData: { cardNumber: string; expiryDate: string; cvc: string };
  onCardChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string[]>;
}

export default function PaymentSection({
  paymentMethod,
  setPaymentMethod,
  cardData,
  onCardChange,
  errors,
}: PaymentSectionProps) {
  const isCard = paymentMethod === "card";

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-zinc-900 font-semibold">
        <CreditCard className="h-5 w-5 text-zinc-500" />
        <h3 className="text-xl">Payment Method</h3>
      </div>

      <div className="space-y-4">
        <label
          className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
            isCard ? "border-[#e6ff2a] bg-[#e6ff2a]/5" : "border-zinc-200"
          }`}
          onClick={() => setPaymentMethod("card")}
        >
          <div className="flex items-center gap-4">
            <input
              type="radio"
              name="paymentType"
              checked={isCard}
              onChange={() => {}}
              className="h-4 w-4 accent-black"
            />
            <div>
              <p className="text-sm font-bold text-zinc-900">
                Credit or Debit Card
              </p>
              <p className="text-xs text-zinc-500 font-mono uppercase tracking-tighter">
                Visa, Mastercard, Amex
              </p>
            </div>
          </div>
          <CreditCard className="h-5 w-5 text-zinc-400" />
        </label>

        <label
          className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
            paymentMethod === "spot"
              ? "border-[#e6ff2a] bg-[#e6ff2a]/5"
              : "border-zinc-200"
          }`}
          onClick={() => setPaymentMethod("spot")}
        >
          <div className="flex items-center gap-4">
            <input
              type="radio"
              name="paymentType"
              checked={paymentMethod === "spot"}
              onChange={() => {}}
              className="h-4 w-4 accent-black"
            />
            <div>
              <p className="text-sm font-bold text-zinc-900">Pay on Spot</p>
              <p className="text-xs text-zinc-500">
                Pay at the rental location
              </p>
            </div>
          </div>
          <Wallet className="h-5 w-5 text-zinc-400" />
        </label>
      </div>

      {isCard && (
        <div className="mt-8 space-y-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              value={cardData.cardNumber}
              onChange={onCardChange}
              maxLength={19}
              className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:ring-2 focus:ring-[#e6ff2a] bg-white text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardData.expiryDate}
                onChange={onCardChange}
                maxLength={5}
                className="w-full rounded-lg border border-zinc-300 p-3 outline-none bg-white text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                CVC
              </label>
              <input
                type="text"
                name="cvc"
                placeholder="123"
                value={cardData.cvc}
                onChange={onCardChange}
                maxLength={3}
                className="w-full rounded-lg border border-zinc-300 p-3 outline-none bg-white text-sm"
              />
            </div>
          </div>
          {errors.card && (
            <p className="text-xs text-red-500 mt-2">{errors.card[0]}</p>
          )}
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-2 text-zinc-400">
        <ShieldCheck className="h-4 w-4" />
        <span className="text-[10px] uppercase tracking-widest font-medium">
          Secure SSL encrypted payment
        </span>
      </div>
    </div>
  );
}
