type Props = {
    onClick: () => void;
    isUploading?: boolean;
    label?: string;
    hint?: string;
  };
  
  export default function FileUploadButton({
    onClick,
    isUploading = false,
    label = "Upload file",
    hint = "PNG, JPG or WEBP up to 5 MB",
  }: Props) {
    return (
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onClick}
          disabled={isUploading}
          className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : label}
        </button>
  
        <p className="text-xs text-gray-500">{hint}</p>
      </div>
    );
  }