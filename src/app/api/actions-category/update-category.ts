"use server";

import { categories } from "@/db/tables/categories";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export default async function updateCategory(id: string, formData: FormData) {
  await requireAdmin();

  if (!id) return;

  const name = formData.get("name") as string;
  const image = formData.get("image") as string;

  await db.update(categories).set({ name, image }).where(eq(categories.id, id));

  revalidatePath("/admin");
}
