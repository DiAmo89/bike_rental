"use client";

import {
  Calendar as CalendarIcon,
  User,
  Phone,
  Mail,
  PlusCircle,
} from "lucide-react";

export default function BookingForm() {
  return (
    <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-zinc-900 font-semibold">
          <CalendarIcon className="h-5 w-5 text-zinc-500" />
          <h3 className="text-xl">Rental Period</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              Pick-up Date & Time
            </label>
            <input
              type="datetime-local"
              placeholder="data"
              className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:ring-2 focus:ring-[#e6ff2a] transition-all bg-zinc-50/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              Return Date & Time
            </label>
            <input
              type="datetime-local"
              placeholder="data"
              className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:ring-2 focus:ring-[#e6ff2a] transition-all bg-zinc-50/50"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-zinc-900 font-semibold">
          <User className="h-5 w-5 text-zinc-500" />
          <h3 className="text-xl">Contact Information</h3>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              First Name
            </label>
            <input
              type="text"
              placeholder="John"
              className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:ring-2 focus:ring-[#e6ff2a] bg-zinc-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Doe"
              className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:ring-2 focus:ring-[#e6ff2a] bg-zinc-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 flex items-center gap-1">
              <Mail className="h-3 w-3" /> Email
            </label>
            <input
              type="email"
              placeholder="john.doe@email.com"
              className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:ring-2 focus:ring-[#e6ff2a] bg-zinc-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 flex items-center gap-1">
              <Phone className="h-3 w-3" /> Phone Number
            </label>
            <input
              type="tel"
              placeholder="+380 00 000 0000"
              className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:ring-2 focus:ring-[#e6ff2a] bg-zinc-50/50"
            />
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-zinc-900 font-semibold">
          <PlusCircle className="h-5 w-5 text-zinc-500" />
          <h3 className="text-xl">Additional Options</h3>
        </div>

        <div className="grid gap-3">
          {["Helmet", "Lock", "Insurance"].map((option) => (
            <label
              key={option}
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-zinc-300 accent-[#e6ff2a]"
                />
                <div>
                  <p className="text-sm font-bold text-zinc-900">{option}</p>
                  <p className="text-xs text-zinc-500">
                    {option === "Helmet" &&
                      "Safety first! Add a helmet to your rental"}
                    {option === "Lock" && "Secure your bike when parked"}
                    {option === "Insurance" &&
                      "Full coverage for damage and theft"}
                  </p>
                </div>
              </div>
              <span className="text-sm font-bold bg-zinc-100 px-3 py-1 rounded-full text-zinc-700 group-hover:bg-[#e6ff2a]">
                {option === "Lock" ? "Free" : "€5/day"}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
