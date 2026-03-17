"use server";

import { db } from "@/db/db";
import { users } from "@/db/tables/users";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { updateProfileSchema } from "@/components/profile/model/updateProfile.schema";
import type { UpdateProfileState } from "@/components/profile/model/profile.types";

export async function updateProfile(
  _prevState: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  const values = {
    avatar: String(formData.get("avatar") ?? "").trim(),
    full_name: String(formData.get("full_name") ?? "").trim(),
    telephone: String(formData.get("telephone") ?? "").trim(),
  };

  const result = updateProfileSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      successMessage: "",
      timestamp: Date.now(),
      fieldErrors: result.error.flatten().fieldErrors,
      values,
    };
  }

  const parsed = result.data;

  await db
    .update(users)
    .set({
      avatar: parsed.avatar,
      fullName: parsed.full_name,
      phone: parsed.telephone ? parsed.telephone : null,
    })
    .where(eq(users.id, currentUser.id));

  revalidatePath("/user-profile");
  revalidatePath("/user-profile/edit");

  return {
    success: true,
    successMessage: "Profile updated",
    timestamp: Date.now(),
    fieldErrors: {},
    values: {
      avatar: parsed.avatar ?? "",
      full_name: parsed.full_name,
      telephone: parsed.telephone ?? "",
    },
  };
}
