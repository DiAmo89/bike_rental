"use client";

import { useState } from "react";
import { User } from "@/types/User";

type Props = {
  user: User;
};

export default function EditProfileForm({ user }: Props) {
  const [name, setName] = useState(user.name);
  const [telephone, setTelephone] = useState(user.telephone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser: User = {
      ...user,
      name,
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Telephone</label>

          <input
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
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
