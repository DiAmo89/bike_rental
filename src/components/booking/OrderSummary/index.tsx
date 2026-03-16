"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function OrderSummary() {
  return (
    <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md">
      <h2 className="text-xl font-bold mb-6 text-zinc-900">Order Summary</h2>

      <div className="flex gap-4 mb-6 border-b border-zinc-600 pb-6">
        <div className="relative h-20 w-24 overflow-hidden rounded-lg bg-zinc-100">
          <Image
            src="/images/categories/mensclothing.jpg"
            alt="Bike name"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-zinc-900 text-sm">
            Trek X-Caliber 8
          </h4>
          <p className="text-xs text-zinc-500">Mountain Bike</p>
          <p className="text-xs text-zinc-500">21-speed</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm text-zinc-600 ">
          <span>Rental (2 days)</span>
          <span className="font-medium text-zinc-900">€50.00</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-600 ">
          <span>Pick-up Date:</span>
          <span className="font-medium text-zinc-900">Jan 20, 2025</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-600">
          <span>Return Date:</span>
          <span className="font-medium text-zinc-900">Jan 22, 2025</span>
        </div>
      </div>

      <div className="space-y-3 mb-6 border-t border-zinc-600 pt-6">
        <div className="flex justify-between text-sm text-zinc-600 ">
          <span>Subtotal</span>
          <span className="font-medium text-zinc-900">€50.00</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-600 ">
          <span>Service Fee</span>
          <span className="font-medium text-zinc-900">€5.00</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-600">
          <span>Tax (10%)</span>
          <span className="font-medium text-zinc-900">€5.00</span>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-zinc-600 pt-4 mb-6">
        <span className="text-lg font-bold text-zinc-900">Total</span>
        <span className="text-lg font-black">€60.50</span>
      </div>

      <Button className="w-full bg-[#e6ff2a] hover:bg-black hover:text-[#e6ff2a] text-black font-bold py-6 rounded-xl transition-all duration-300 uppercase tracking-widest text-xs">
        Confirm & Pay
      </Button>

      <p className="text-[10px] text-zinc-400 text-center mt-4 uppercase tracking-tighter">
        By clicking, you agree to the rental terms
      </p>
    </div>
  );
}
