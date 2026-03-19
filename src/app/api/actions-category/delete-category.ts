"use server";

import { categories } from "@/db/tables/categories";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export default async function deleteCategory(id: string) {
  await requireAdmin();

  if (!id) return;

  await db.delete(categories).where(eq(categories.id, id));

  revalidatePath("/admin");
}
