"use server";

import { categories } from "@/db/tables/categories";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/requireAdmin";

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

function isForeignKeyConstraintError(error: unknown) {
  const errorCode = getErrorCode(error);

  if (errorCode === "23503") {
    return true;
  }

  const message = getErrorMessage(error).toLowerCase();

  return (
    message.includes("foreign key") ||
    message.includes("violates foreign key constraint")
  );
}

export default async function deleteCategory(id: string) {
  await requireAdmin();

  if (!id) return;

  try {
    await db.delete(categories).where(eq(categories.id, id));
  } catch (error) {
    if (isForeignKeyConstraintError(error)) {
      throw new Error(
        "Cannot delete category because it is used by existing bikes.",
      );
    }

    throw new Error("Failed to delete category");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/categories/new");
}
