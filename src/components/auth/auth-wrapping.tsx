"use client";

import { useEffect, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AuthPortalProps {
  children: ReactNode;
}

export default function AuthWrapping({ children }: AuthPortalProps) {
  const router = useRouter();

  const closePortal = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePortal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [closePortal]);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/auth-wrapping-bgf.png"
          alt="Foggy Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-bl from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-80" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* <div
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={closePortal}
      /> */}

      <div
        className="relative z-20 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
