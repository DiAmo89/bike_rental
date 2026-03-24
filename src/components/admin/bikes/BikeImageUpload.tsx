"use client";

import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onUploadingChange?: Dispatch<SetStateAction<boolean>>;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function BikeImageUpload({
  value,
  onChange,
  onUploadingChange,
}: Props) {
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadError("");

    if (file.size > MAX_FILE_SIZE) {
      setUploadError("File size must be less than 5 MB");
      event.target.value = "";
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError("Only JPG, PNG or WEBP images are allowed");
      event.target.value = "";
      return;
    }

    try {
      setIsUploading(true);
      onUploadingChange?.(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "blablabike/bikes");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }

      onChange(data.url);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Image upload failed"
      );
    } finally {
      setIsUploading(false);
      onUploadingChange?.(false);
      event.target.value = "";
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium">Bike image</label>

      <div className="mt-2 flex items-center gap-4">
        {value ? (
          <img
            src={value}
            alt="Bike preview"
            className=" h-24 w-36 object-contain"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-gray-200 bg-gray-100 text-xs text-gray-500">
            No image
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload image"}
          </button>

          <p className="text-xs text-gray-500">
            PNG, JPG or WEBP up to 5 MB
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleImageChange}
        className="hidden"
      />

      <input type="hidden" name="image" value={value} />

      <div className="min-h-5 pt-2">
        {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
      </div>
    </div>
  );
}