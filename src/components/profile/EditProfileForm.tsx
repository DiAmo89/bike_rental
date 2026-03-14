"use client";

import { updateProfile, type UpdateProfileState } from "@/app/actions/updateProfile";
import { CurrentUser } from "@/types/CurrentUser";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

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
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Avatar</label>
          <input
            name="avatar"
            defaultValue={state.values.avatar}
            className="mt-1 w-full rounded-xl border px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="full_name"
            defaultValue={state.values.full_name}
            className="mt-1 w-full rounded-xl border px-4 py-2"
          />
          <div className="mt-1 min-h-[20px]">
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
            className="mt-1 w-full rounded-xl border px-4 py-2"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <SubmitButton />
        <div className="min-h-[20px]">
          {showSuccess && state?.successMessage && (
            <p className="text-sm text-green-600">{state.successMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}
