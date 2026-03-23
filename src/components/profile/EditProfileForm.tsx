"use client";

import { updateProfile } from "@/app/actions/updateProfile";
import { CurrentUser } from "@/types/CurrentUser";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { UpdateProfileState } from "./model/profile.types";

type Props = {
  user: CurrentUser;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-black px-5 py-2 text-white disabled:opacity-50"
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
}

export default function EditProfileForm({ user }: Props) {
  const initialState: UpdateProfileState = {
    success: false,
    successMessage: "",
    timestamp: 0,
    fieldErrors: {},
    values: {
      avatar: user.avatar ?? "",
      full_name: user.full_name,
      telephone: user.telephone ?? "",
    },
  };

  const [state, formAction] = useActionState(updateProfile, initialState);
  const [showSuccess, setShowSuccess] = useState(false);

  const fullNameError = state?.fieldErrors?.full_name?.[0];
  const telephoneError = state?.fieldErrors?.telephone?.[0];

  useEffect(() => {
    if (!state?.success || !state?.successMessage) return;

    setShowSuccess(true);

    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [state?.timestamp, state?.success, state?.successMessage]);

  return (
    <form
      action={formAction}
      className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div >
        <div>
          <label className="block text-sm font-medium ">Avatar</label>
          <input
            name="avatar"
            defaultValue={state.values.avatar}
            placeholder="https://example.com/avatar.jpg"
            className="mt-1 w-full rounded-xl border px-4 py-2  border-gray-200"
          />
          <div className="min-h-5" />
        </div>

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="full_name"
            defaultValue={state.values.full_name}
            placeholder="Enter your full name"
            className="mt-1 w-full rounded-xl border px-4 py-2  border-gray-200"
          />
          <div className="min-h-5">
            {fullNameError && (
              <p className="text-sm text-red-600">{fullNameError}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Telephone</label>
          <input
            name="telephone"
            defaultValue={state.values.telephone}
            placeholder="+49 155 6618 3536"
            className="mt-1 w-full rounded-xl border px-4 py-2  border-gray-200"
          />
          <div className="min-h-5">
            {telephoneError && (
              <p className="mt-1 text-sm text-red-600">{telephoneError}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <SubmitButton />
        <div className="min-h-5">
          {showSuccess && state?.successMessage && (
            <p className="text-sm text-green-600">{state.successMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}
