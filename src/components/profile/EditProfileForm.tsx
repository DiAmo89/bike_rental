"use client";

import { CurrentUser } from "@/types/CurrentUser";
import { useState } from "react";

type Props = {
  user: CurrentUser;
};

export default function EditProfileForm({ user }: Props) {
  const [full_name, setFullName] = useState(user.full_name);
  const [telephone, setPhone] = useState(user.telephone ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser: CurrentUser = {
      ...user,
      full_name,
      telephone,
    };

    console.log("Updated user:", updatedUser);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>

          <input
            type="text"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-xl border px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Telephone</label>

          <input
            type="tel"
            value={telephone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-xl border px-4 py-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 rounded-xl bg-black px-5 py-2 text-white"
      >
        Save
      </button>
    </form>
  );
}