"use client";

import { CreditCard, Wallet, ShieldCheck } from "lucide-react";

export default function PaymentSection() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-zinc-900 font-semibold">
          <CreditCard className="h-5 w-5 text-zinc-500" />
          <h3 className="text-xl">Payment Method</h3>
        </div>

        <div className="space-y-4">
          {/* ВАРІАНТ 1: КАРТКА */}
          <label className="flex items-center justify-between p-4 rounded-xl border-2 border-[#e6ff2a] bg-[#e6ff2a]/5 cursor-pointer transition-all">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="paymentMethod"
                defaultChecked
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

          <label className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 hover:border-zinc-300 cursor-pointer transition-all">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="paymentMethod"
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

        <div className="mt-8 space-y-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Card Number
            </label>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
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
                placeholder="MM/YY"
                className="w-full rounded-lg border border-zinc-300 p-3 outline-none bg-white text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                CVC
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full rounded-lg border border-zinc-300 p-3 outline-none bg-white text-sm"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-zinc-400">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-[10px] uppercase tracking-widest font-medium">
            Secure SSL encrypted payment
          </span>
        </div>
      </div>
    </div>
  );
}
