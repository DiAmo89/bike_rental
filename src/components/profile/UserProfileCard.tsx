"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CurrentUser } from "@/types/CurrentUser";

type Props = {
  user: CurrentUser;
};

export default function UserProfileCard({ user }: Props) {
  const [avatarError, setAvatarError] = useState(false);

  const initials = useMemo(() => {
    return user.full_name
      .trim()
      .split(/\s+/)
      .map((part) => part[0] ?? "")
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [user.full_name]);

  const avatarSrc = user.avatar?.trim() || undefined;
  const showAvatar = Boolean(avatarSrc) && !avatarError;

  const memberSince = useMemo(() => {
    return new Intl.DateTimeFormat("de-DE").format(new Date(user.created_at));
  }, [user.created_at]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-6">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gray-200 to-gray-300 text-2xl font-semibold text-gray-700">
            {showAvatar ? (
              <Image
                src={avatarSrc!}
                alt={user.full_name}
                fill
                unoptimized
                className="object-cover"
                sizes="80px"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{user.full_name}</h2>
            <p className="text-gray-500">Member since {memberSince}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        <div>
          <p className="text-gray-500">Phone</p>
          <p className="font-medium">{user.telephone || "Not specified"}</p>
        </div>
      </div>
    </div>
  );
}
