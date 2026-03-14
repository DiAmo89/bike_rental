"use server";

import { categories } from "@/db/tables/categories";
import { db } from "@/db/db";
import { bikes } from "@/db/tables/bikes";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBike(formData: FormData) {
  const brand = formData.get("brand") as string;
  const model = formData.get("model") as string;
  const description = formData.get("description") as string;
  const pricePerDay = formData.get("price_per_day") as string;
  const image = formData.get("image") as string;
  const bikeCategoryId = formData.get("bike_category_id") as string;

  const category = await db
    .select()
    .from(categories)
    .where(eq(categories.id, bikeCategoryId))
    .limit(1);
  if (!category[0]) throw new Error("Categories not found!");

  await db
    .insert(bikes)
    .values({ brand, model, description, pricePerDay, image, bikeCategoryId });
  revalidatePath("/admin");
}
