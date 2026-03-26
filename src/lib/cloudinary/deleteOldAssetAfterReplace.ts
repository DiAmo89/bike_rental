import { deleteCloudinaryImage } from "./deleteImage";

type Params = {
  oldKey?: string | null;
  newKey?: string | null;
};

export async function deleteOldAssetAfterReplace({
  oldKey,
  newKey,
}: Params) {
  if (!oldKey) return;
  if (!newKey) return;
  if (oldKey === newKey) return;

  await deleteCloudinaryImage(oldKey);
}