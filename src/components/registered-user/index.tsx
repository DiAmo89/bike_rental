"use client";

import { useSession } from "next-auth/react";

export default function RegisteredUser() {
  const { data: session } = useSession();

  return (
    <div
      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-56 p-4
                 bg-zinc-950 border border-zinc-800 rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.8)]
                 opacity-0 scale-95 pointer-events-none
                 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                 group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:pointer-events-auto
                 transition-all duration-200 ease-out z-50"
    >
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-950 border-t border-l border-zinc-800 rotate-45"></div>

      <div className="flex flex-col gap-1 relative z-10">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
            Account
          </p>
          <span className="h-1.5 w-1.5 rounded-full bg-[#e6ff2a] animate-pulse"></span>
        </div>

        <p className="font-bold text-zinc-50 text-sm truncate">
          {session?.user?.name || "Bike Enthusiast"}
        </p>

        <p className="text-[11px] text-zinc-400 font-mono truncate">
          {session?.user?.email}
        </p>
      </div>
    </div>
  );
}
