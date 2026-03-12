"use client";
import Link from "next/link";
import { PATH_CATALOG, PATH_ABOUT_US, USER_PROFILE } from "@/app/path/path";

import Logo from "@/components/nav-bar/logo-svg";
import Sidebar from "@/components/nav-bar/sidebar-burger-menu";

import { useState } from "react";
import { usePathname } from "next/navigation";
import SignInSignOut from "../sign-in-sign-out";

const NavBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-sm">
        <div className="w-full px-0 py-4 grid grid-cols-3 items-center">
          <div className="flex items-center gap-2 ml-8">
            <Link href="/">
              <Logo />
            </Link>
            <Link href="/">
              <span className="text-[#e6ff2a] font-bold text-xl tracking-wide">
                Blabla<span className="text-white">Bike</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-4 col-start-3">
            <div className="hidden xl:flex items-center gap-8">
              <Link
                href={PATH_CATALOG}
                className={`text-sm font-medium transition ${pathname === PATH_CATALOG ? "text-[#e6ff2a]" : "text-white hover:text-[#e6ff2a]"}`}
              >
                Catalog
              </Link>
              <Link
                href={PATH_ABOUT_US}
                className={`text-sm font-medium transition ${pathname === PATH_ABOUT_US ? "text-[#e6ff2a]" : "text-white hover:text-[#e6ff2a]"}`}
              >
                About Us
              </Link>
              <Link
                href={USER_PROFILE}
                className={`text-sm font-medium transition ${pathname === USER_PROFILE ? "text-[#e6ff2a]" : "text-white hover:text-[#e6ff2a]"}`}
              >
                Profile
              </Link>
            </div>

            <div className="hidden xl:block">
              <SignInSignOut />
            </div>

            <button
              className="xl:hidden text-white pr-2 ml-auto mr-8"
              aria-label="Open menu"
              onClick={() => setShowSidebar(true)}
            >
              <svg
                width="32"
                height="32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 10h20M6 16h20M6 22h20" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
    </>
  );
};

export default NavBar;
