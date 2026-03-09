import React from "react";
import Link from "next/link";
import {
  PATH_CATALOG,
  PATH_ABOUT_US,
  PATH_LOGIN,
  PATH_SIGN_UP,
  USER_PROFILE,
  USER_BOOKINGS,
} from "@/app/path/path";
import Logo from "@/components/nav-bar/logo-svg/Logo";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-sm">
      <div className="w-full px-8 py-4 grid grid-cols-3 items-center">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-[#e6ff2a] font-bold text-xl tracking-wide">
            Blabla<span className="text-white">Bike</span>
          </span>
        </div>
        <div className="flex items-center justify-center gap-8">
          <Link
            href={PATH_CATALOG}
            className="text-white hover:text-[#e6ff2a] transition text-sm font-medium"
          >
            Catalog
          </Link>
          <Link
            href={PATH_ABOUT_US}
            className="text-white hover:text-[#e6ff2a] transition text-sm font-medium"
          >
            About Us
          </Link>

          <Link
            href={USER_PROFILE}
            className="text-white hover:text-[#e6ff2a] transition text-sm font-medium"
          >
            Profile
          </Link>

          <Link
            href={USER_BOOKINGS}
            className="text-white hover:text-[#e6ff2a] transition text-sm font-medium"
          >
            My Bookings
          </Link>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Link
            href={PATH_LOGIN}
            className="text-white hover:text-[#e6ff2a] transition text-sm font-medium"
          >
            Login
          </Link>
          <Link
            href={PATH_SIGN_UP}
            className="bg-[#e6ff2a] text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
