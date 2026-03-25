"use server";

type DeleteManagedFileOptions = {
  key?: string | null;
  allowedFolder: string;
};

function normalizeKey(key: string) {
  return key.replace(/^\/+/, "").trim();
}

export async function deleteManagedFile({
  key,
  allowedFolder,
}: DeleteManagedFileOptions) {
  if (!key) return;

  const normalizedKey = normalizeKey(key);
  const normalizedFolder = normalizeKey(allowedFolder);

  if (!normalizedKey.startsWith(`${normalizedFolder}/`)) {
    console.warn(
      `Refused to delete file outside allowed folder: ${normalizedKey}`
    );
    return;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/upload`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.INTERNAL_UPLOAD_SECRET}`,
    },
    body: JSON.stringify({ key: normalizedKey }),
    cache: "no-store",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error || "Failed to delete file");
  }
}