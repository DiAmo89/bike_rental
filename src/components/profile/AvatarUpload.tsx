"use client";

import { Dispatch, SetStateAction } from "react";
import ImageUploadField from "@/components/common/image-upload-field";

type Props = {
  value: string;
  assetKey: string;
  onChange: Dispatch<SetStateAction<{ url: string; key: string }>>;
  onUploadingChange?: Dispatch<SetStateAction<boolean>>;
};

export default function AvatarUpload({
  value,
  assetKey,
  onChange,
  onUploadingChange,
}: Props) {
  return (
    <ImageUploadField
      label="Avatar"
      name="avatar"
      keyName="avatarKey"
      value={value}
      assetKey={assetKey}
      onChange={onChange}
      folder="blablabike/avatars"
      onUploadingChange={onUploadingChange}
      uploadErrorMessage="Avatar upload failed"
      renderPreview={(value) =>
        value ? (
          <img
            src={value}
            alt="Avatar preview"
            className="h-20 w-20 rounded-full border border-gray-200 object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-xs text-gray-500">
            No avatar
          </div>
        )
      }
    />
  );
}