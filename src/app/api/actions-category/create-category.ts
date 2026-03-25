"use server";

import { categories } from "@/db/tables/categories";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { redirect } from "next/navigation";

type CategoryFormValues = {
  name: string;
  image: string;
};

export type CreateCategoryState = {
  error: string | null;
  values: CategoryFormValues;
};

function getCategoryFormValues(formData: FormData): CategoryFormValues {
  return {
    name: String(formData.get("name") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
  };
}

function getErrorCode(error: unknown): string | null {
  if (typeof error !== "object" || error === null) {
    return null;
  }

  if ("code" in error && typeof error.code === "string") {
    return error.code;
  }

  if ("cause" in error) {
    return getErrorCode(error.cause);
  }

  return null;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error ?? "");
}

function isUniqueConstraintError(error: unknown) {
  const errorCode = getErrorCode(error);

  if (errorCode === "23505") {
    return true;
  }

  const errorMessage = getErrorMessage(error).toLowerCase();

  return (
    errorMessage.includes("duplicate key") ||
    errorMessage.includes("unique constraint")
  );
}

export async function createCategoryRecord(values: CategoryFormValues) {
  await requireAdmin();

  await db.insert(categories).values(values);

  revalidatePath("/admin");
  revalidatePath("/admin/categories/new");
}

export async function createCategoryAction(
  _prevState: CreateCategoryState,
  formData: FormData,
): Promise<CreateCategoryState> {
  const values = getCategoryFormValues(formData);

  try {
    await createCategoryRecord(values);
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return {
        error: "Category already exists",
        values,
      };
    }

    throw error;
  }

  redirect("/admin/categories/new");
}

export default async function createCategory(formData: FormData) {
  const values = getCategoryFormValues(formData);

  await createCategoryRecord(values);

  redirect("/admin/categories/new");
}
