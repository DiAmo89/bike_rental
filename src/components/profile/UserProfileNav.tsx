"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/user-profile", label: "Profile" },
  { href: "/user-profile/bookings", label: "Bookings" },
  { href: "/user-profile/edit", label: "Edit Profile" },
];

export default function UserProfileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}