"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { PATH_LOGIN, PATH_SIGN_UP } from "@/app/path/path";
import RegisteredUser from "../registered-user";

export default function SignInSignOut() {
  const { data: session } = useSession();

  const baseStyles =
    "flex items-center gap-3 bg-[#e6ff2a] text-black px-4 py-2 rounded-full text-sm font-medium transition mr-8";

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className={baseStyles}>
          <div
            className="relative group flex items-center outline-none cursor-help"
            tabIndex={0}
          >
            <Image
              src={session.user?.image || ""}
              alt={session.user?.name || "User"}
              width={26}
              height={26}
              unoptimized
              className="rounded-full border border-black/10"
            />

            <RegisteredUser />
          </div>

          <span className="w-0.5 h-4 bg-black/20"></span>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="hover:text-zinc-700 transition-colors font-bold uppercase text-[11px] tracking-tight"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <Link
        href={PATH_LOGIN}
        className="hidden xl:inline text-sm font-medium text-white hover:text-[#e6ff2a] transition mr-4"
      >
        Login
      </Link>

      <Link href={PATH_SIGN_UP} className={baseStyles + " hover:bg-white"}>
        Sign In
      </Link>
    </div>
  );
}
