"use client";

import { updateProfile } from "@/app/actions/updateProfile";
import { CurrentUser } from "@/types/CurrentUser";
import { useActionState, useEffect, useRef, useState } from "react";
import AvatarUpload from "./AvatarUpload";
import SubmitButton from "./SubmitButton";
import { UpdateProfileState } from "./model/profile.types";

type Props = {
  user: CurrentUser;
};

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
  const [avatarUrl, setAvatarUrl] = useState(initialState.values.avatar);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // refs для input
  const fullNameRef = useRef<HTMLInputElement>(null);
  const telephoneRef = useRef<HTMLInputElement>(null);

  // фиксируем initial values один раз
  const initialValuesRef = useRef(initialState.values);
  const initialValues = initialValuesRef.current;

  const fullNameError = state?.fieldErrors?.full_name?.[0];
  const telephoneError = state?.fieldErrors?.telephone?.[0];

  function checkIsDirty() {
    const fullName = fullNameRef.current?.value ?? "";
    const telephone = telephoneRef.current?.value ?? "";

    const changed =
      fullName !== initialValues.full_name ||
      telephone !== initialValues.telephone ||
      avatarUrl !== initialValues.avatar;

    setIsDirty(changed);
  }

  useEffect(() => {
    checkIsDirty();
  }, [avatarUrl]);

  useEffect(() => {
    if (!state?.success || !state?.successMessage) return;

    setShowSuccess(true);
    setIsDirty(false); // сброс dirty после сохранения

    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [state?.timestamp, state?.success, state?.successMessage]);

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (isUploadingAvatar) {
          e.preventDefault();
        }
      }}
      className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <AvatarUpload
          value={avatarUrl}
          onChange={setAvatarUrl}
          onUploadingChange={setIsUploadingAvatar}
        />

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            ref={fullNameRef}
            name="full_name"
            defaultValue={state.values.full_name}
            onChange={checkIsDirty}
            placeholder="Enter your full name"
            className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2"
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
            ref={telephoneRef}
            name="telephone"
            defaultValue={state.values.telephone}
            onChange={checkIsDirty}
            placeholder="+49 155 6618 3536"
            className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2"
          />
          <div className="min-h-5">
            {telephoneError && (
              <p className="mt-1 text-sm text-red-600">
                {telephoneError}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <SubmitButton disabled={!isDirty || isUploadingAvatar} />

        <div className="min-h-5">
          {showSuccess && state?.successMessage && (
            <p className="text-sm text-green-600">
              {state.successMessage}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}