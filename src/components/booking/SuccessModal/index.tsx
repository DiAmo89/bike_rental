"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, X } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#e6ff2a", "#000000", "#ffffff"],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md scale-100 rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-6 rounded-full bg-[#e6ff2a]/10 p-4">
            <CheckCircle2 className="h-16 w-16 text-[#e6ff2a]" />
          </div>

          <h2 className="mb-2 text-3xl font-bold text-white">
            Booking Confirmed!
          </h2>
          <p className="mb-8 text-zinc-400">
            Your bike is ready for adventure. Pick up your bike at the
            Blablabike parking lot.
          </p>

          <div className="grid w-full gap-3">
            <Button
              onClick={() => {
                onClose();
                router.push("/user-profile/bookings");
              }}
              className="w-full bg-[#e6ff2a] text-black hover:bg-[#d4ed25] font-bold py-6 rounded-xl"
            >
              View My Bookings
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                onClose();
                router.push("/catalog");
              }}
              className="w-full border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white py-6 rounded-xl"
            >
              Back to Catalog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
