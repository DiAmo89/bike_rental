"use server";

import { bikes } from "@/db/tables/bikes";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function updateBike(id: string, formData: FormData) {
  if (!id) return;
  const brand = formData.get("brand") as string;
  const model = formData.get("model") as string;
  const description = formData.get("description") as string;
  const pricePerDay = formData.get("price_per_day") as string;
  const image = formData.get("image") as string;
  const bikeCategoryId = formData.get("bike_category_id") as string;

  await db
    .update(bikes)
    .set({ brand, model, description, pricePerDay, image, bikeCategoryId })
    .where(eq(bikes.id, id));
  revalidatePath("/admin");
}
