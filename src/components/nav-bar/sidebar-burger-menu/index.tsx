"use client";
import React from "react";
import Link from "next/link";
import {
  PATH_CATALOG,
  PATH_ABOUT_US,
  USER_PROFILE,
  PATH_ADMIN,
} from "@/app/path/path";
import SignInSignOut from "@/components/sign-in-sign-out";
import { useSession } from "next-auth/react";

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role === "ADMIN";
  const isLoggedIn = status === "authenticated" && !!session;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex">
      <div className="w-64 bg-white h-full shadow-xl p-6 flex flex-col gap-6 relative">
        <button
          className="absolute top-4 right-4 text-2xl text-black hover:text-red-500"
          onClick={onClose}
          aria-label="Close menu"
        >
          ×
        </button>
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href={PATH_CATALOG}
            onClick={onClose}
            className="text-black text-lg font-medium hover:text-[#e6ff2a]"
          >
            Catalog
          </Link>
          <Link
            href={PATH_ABOUT_US}
            onClick={onClose}
            className="text-black text-lg font-medium hover:text-[#e6ff2a]"
          >
            About Us
          </Link>
          {isLoggedIn && (
            <Link
              href={USER_PROFILE}
              onClick={onClose}
              className="text-black text-lg font-medium hover:text-[#e6ff2a]"
            >
              Profile
            </Link>
          )}
          {isAdmin && (
            <Link
              href={PATH_ADMIN}
              onClick={onClose}
              className="text-black text-lg font-medium hover:text-[#e6ff2a]"
            >
              Admin
            </Link>
          )}

          <div className="">
            <SignInSignOut />
          </div>
        </nav>
      </div>

      <div className="flex-1" onClick={onClose} />
    </div>
  );
}
