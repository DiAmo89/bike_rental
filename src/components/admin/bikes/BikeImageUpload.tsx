"use client";

import { Dispatch, SetStateAction } from "react";
import ImageUploadField from "@/components/common/image-upload-field";

type Props = {
  value: string;
  assetKey: string;
  onChange: (value: { url: string; key: string }) => void;
  onUploadingChange?: Dispatch<SetStateAction<boolean>>;
};

export default function BikeImageUpload({
  value,
  assetKey,
  onChange,
  onUploadingChange,
}: Props) {
  return (
    <ImageUploadField
      label="Bike image"
      name="image"
      keyName="imageKey"
      value={value}
      assetKey={assetKey}
      onChange={(next) => onChange({ url: next.url, key: next.key })}
      folder="blablabike/bikes"
      onUploadingChange={onUploadingChange}
      uploadErrorMessage="Image upload failed"
      renderPreview={(value) =>
        value ? (
          <img
            src={value}
            alt="Bike preview"
            className="h-24 w-36 object-contain"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-gray-200 bg-gray-100 text-xs text-gray-500">
            No image
          </div>
        )
      }
    />
  );
}