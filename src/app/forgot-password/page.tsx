"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ComingSoonMessage from "@/components/auth/coming-soon-wrapper";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl text-zinc-50">
        <div className="flex flex-col space-y-2 pb-6 text-center">
          <h3 className="text-2xl font-semibold tracking-tight">
            Reset password
          </h3>
          <p className="text-sm text-zinc-400">Recovery service</p>
        </div>

        <ComingSoonMessage />

        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
