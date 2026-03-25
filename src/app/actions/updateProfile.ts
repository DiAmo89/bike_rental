"use server";

import { db } from "@/db/db";
import { users } from "@/db/tables/users";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { revalidatePath } from "next/cache";

import { updateProfileSchema } from "@/components/profile/model/updateProfile.schema";
import type { UpdateProfileState } from "@/components/profile/model/profile.types";
import { deleteOldAssetAfterReplace } from "@/lib/cloudinary/deleteOldAssetAfterReplace";

export async function updateProfile(
  _prevState: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  const values = {
    avatar: String(formData.get("avatar") ?? ""),
    avatarKey: String(formData.get("avatarKey") ?? ""),
    full_name: String(formData.get("full_name") ?? ""),
    telephone: String(formData.get("telephone") ?? ""),
  };

  const parsed = updateProfileSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      successMessage: "",
      timestamp: Date.now(),
      fieldErrors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, currentUser.id),
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const oldAvatarKey = existingUser.avatarKey ?? "";

  await db
    .update(users)
    .set({
      avatar: parsed.data.avatar || null,
      avatarKey: parsed.data.avatarKey || null,
      fullName: parsed.data.full_name,
      phone: parsed.data.telephone || null,
    })
    .where(eq(users.id, currentUser.id));

  await deleteOldAssetAfterReplace({
    oldKey: oldAvatarKey,
    newKey: parsed.data.avatarKey ?? "",
  });

  revalidatePath("/user-profile");
  revalidatePath("/user-profile/edit");

  return {
    success: true,
    successMessage: "Profile updated successfully",
    timestamp: Date.now(),
    fieldErrors: {},
    values: {
      avatar: parsed.data.avatar ?? "",
      avatarKey: parsed.data.avatarKey ?? "",
      full_name: parsed.data.full_name,
      telephone: parsed.data.telephone ?? "",
    },
  };
}