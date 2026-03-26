"use client";

import { updateProfile } from "@/app/actions/updateProfile";
import { CurrentUser } from "@/types/CurrentUser";
import { useActionState, useEffect, useRef, useState } from "react";
import AvatarUpload from "./AvatarUpload";
import { UpdateProfileState } from "./model/profile.types";
import SubmitButton from "../ui/submit-form-button";

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
      avatarKey: user.avatarKey ?? "",
      full_name: user.full_name,
      telephone: user.telephone ?? "",
    },
  };

  const [state, formAction] = useActionState(updateProfile, initialState);

  const [showSuccess, setShowSuccess] = useState(false);
  const [avatar, setAvatar] = useState({
    url: initialState.values.avatar,
    key: initialState.values.avatarKey,
  });
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const telephoneRef = useRef<HTMLInputElement>(null);

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
      avatar.url !== initialValues.avatar ||
      avatar.key !== initialValues.avatarKey;

    setIsDirty(changed);
  }

  useEffect(() => {
    checkIsDirty();
  }, [avatar]);

  useEffect(() => {
    if (!state?.success || !state?.successMessage) return;

    setShowSuccess(true);
    setIsDirty(false);

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
          value={avatar.url}
          assetKey={avatar.key}
          onChange={setAvatar}
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
              <p className="mt-1 text-sm text-red-600">{telephoneError}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <SubmitButton disabled={!isDirty || isUploadingAvatar} />

        <div className="min-h-5">
          {showSuccess && state?.successMessage && (
            <p className="text-sm text-green-600">{state.successMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}