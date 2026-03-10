import React from "react";
import Link from "next/link";

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
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
            href="/catalog"
            onClick={onClose}
            className="text-black text-lg font-medium hover:text-[#e6ff2a]"
          >
            Catalog
          </Link>
          <Link
            href="/about-us"
            onClick={onClose}
            className="text-black text-lg font-medium hover:text-[#e6ff2a]"
          >
            About Us
          </Link>
          <Link
            href="/user-profile"
            onClick={onClose}
            className="text-black text-lg font-medium hover:text-[#e6ff2a]"
          >
            Profile
          </Link>
          <Link
            href="/login"
            onClick={onClose}
            className="text-black text-lg font-medium hover:text-[#e6ff2a]"
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            onClick={onClose}
            className="bg-[#e6ff2a] text-black px-4 py-2 rounded-full text-lg font-medium hover:bg-white transition"
          >
            Sign Up
          </Link>
        </nav>
      </div>
      
      <div className="flex-1" onClick={onClose} />
    </div>
  );
}
