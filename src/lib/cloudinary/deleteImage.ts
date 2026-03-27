import { cloudinary } from "@/lib/cloudinary";

const ALLOWED_FOLDERS = [
  "blablabike/avatars",
  "blablabike/bikes",
] as const;

function isAllowedPublicId(publicId: string) {
  return ALLOWED_FOLDERS.some(
    (folder) => publicId === folder || publicId.startsWith(`${folder}/`)
  );
}

export async function deleteCloudinaryImage(publicId?: string | null) {
  if (!publicId) return;

  if (!isAllowedPublicId(publicId)) {
    console.warn(`Refused to delete disallowed Cloudinary asset: ${publicId}`);
    return;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    if (result.result !== "ok" && result.result !== "not found") {
      console.warn("Unexpected Cloudinary destroy result:", result);
    }
  } catch (error) {
    console.error("Cloudinary delete failed:", error);
  }
}