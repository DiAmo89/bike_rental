"use server";

import { db } from "@/db/db";
import { users } from "@/db/tables/users";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { revalidatePath } from "next/cache";
import z from "zod";

const UpdateProfileSchema = z.object({
  avatar: z.string().optional(),
  full_name: z
    .string()
    .min(2, "Name must have minimum 2 symbols")
    .max(120, "Name is too long"),
  telephone: z.string().optional(),
});

type UpdateProfileFieldErrors = z.inferFlattenedErrors<
  typeof UpdateProfileSchema
>["fieldErrors"];

export type UpdateProfileState = {
  success: boolean;
  successMessage: string;
  timestamp: number;
  fieldErrors: UpdateProfileFieldErrors;
  values: {
    avatar: string;
    full_name: string;
    telephone: string;
  };
};

export async function updateProfile(
  _prevState: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  const avatar = String(formData.get("avatar") ?? "");
  const full_name = String(formData.get("full_name") ?? "");
  const telephone = String(formData.get("telephone") ?? "");

  try {
    const parsed = UpdateProfileSchema.parse({
      avatar,
      full_name,
      telephone,
    });

    await db
      .update(users)
      .set({
        avatar: parsed.avatar,
        fullName: parsed.full_name,
        phone: parsed.telephone,
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
  } catch (err) {
    console.error("UPDATE ERROR:", err);

    if (err instanceof z.ZodError) {
      const flattened = z.flattenError(err);

      return {
        success: false,
        successMessage: "",
        timestamp: Date.now(),
        fieldErrors: flattened.fieldErrors,
        values: {
          avatar,
          full_name,
          telephone,
        },
      };
    }

    throw err;
  }
}
