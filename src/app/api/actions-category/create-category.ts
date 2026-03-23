"use server";

import { categories } from "@/db/tables/categories";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { redirect } from "next/navigation";

export default async function createCategory(formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const image = formData.get("image") as string;

  await db.insert(categories).values({ name, image });

  revalidatePath("/admin");
  revalidatePath("/admin/categories/new");

  redirect("/admin/categories/new");
}
