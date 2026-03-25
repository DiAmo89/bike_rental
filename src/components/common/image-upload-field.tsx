"use client";

import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from "react";
import FileUploadButton from "@/components/common/file-upload-button";

type Props = {
  label: string;
  name: string;
  keyName: string;
  value: string;
  assetKey: string;
  onChange: (next: { url: string; key: string }) => void;
  folder: string;
  onUploadingChange?: Dispatch<SetStateAction<boolean>>;
  uploadErrorMessage?: string;
  renderPreview: (value: string) => ReactNode;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ImageUploadField({
  label,
  name,
  keyName,
  value,
  assetKey,
  onChange,
  folder,
  onUploadingChange,
  uploadErrorMessage = "Image upload failed",
  renderPreview,
}: Props) {
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
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
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || uploadErrorMessage);
      }

      onChange({
        url: data.url,
        key: data.publicId,
      });
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : uploadErrorMessage
      );
    } finally {
      setIsUploading(false);
      onUploadingChange?.(false);
      event.target.value = "";
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>

      <div className="mt-2 flex items-center gap-4">
        {renderPreview(value)}

        <FileUploadButton
          onClick={() => inputRef.current?.click()}
          isUploading={isUploading}
          label={isUploading ? "Uploading..." : "Upload image"}
        />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      <input type="hidden" name={name} value={value} />
      <input type="hidden" name={keyName} value={assetKey} />

      <div className="min-h-5 pt-2">
        {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
      </div>
    </div>
  );
}