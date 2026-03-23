"use server";

import { categories } from "@/db/tables/categories";
import { db } from "@/db/db";
import { bikes } from "@/db/tables/bikes";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function createBike(formData: FormData) {
  await requireAdmin();

  const brand = formData.get("brand") as string;
  const model = formData.get("model") as string;
  const description = formData.get("description") as string;
  const pricePerDayRaw = formData.get("price_per_day") as string;
  const image = formData.get("image") as string;
  const bikeCategoryId = formData.get("bike_category_id") as string;

  const pricePerDay = Number(pricePerDayRaw);

  if (Number.isNaN(pricePerDay)) {
    throw new Error("Price per day must be a valid number");
  }

  if (pricePerDay < 0) {
    throw new Error("Price per day must be 0 or greater");
  }

  const category = await db
    .select()
    .from(categories)
    .where(eq(categories.id, bikeCategoryId))
    .limit(1);

  if (!category[0]) {
    throw new Error("Categories not found!");
  }

  await db.insert(bikes).values({
    brand,
    model,
    description,
    pricePerDay: pricePerDay.toString(),
    image,
    bikeCategoryId,
  });

  revalidatePath("/admin");
}
