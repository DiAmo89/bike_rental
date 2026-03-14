"use server";

import { categories } from "@/db/tables/categories";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";

export default async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const image = formData.get("image") as string;

  await db.insert(categories).values({ name, image });

  revalidatePath("/admin");
}
