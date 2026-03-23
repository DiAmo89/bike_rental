"use client";

import { useFormStatus } from "react-dom";

type Props = {
  disabled?: boolean;
};

export default function SubmitButton({ disabled = false }: Props) {
  const { pending } = useFormStatus();

  const isDisabled = pending || disabled;

  let label = "Save";

  if (pending) label = "Saving...";

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="rounded-xl bg-black px-5 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
}