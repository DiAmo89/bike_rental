"use server";

import { categories } from "@/db/tables/categories";
import { bikes } from "@/db/tables/bikes";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import {
  normalizeBikePrice,
  validateBikePrice,
  validateBikeTextField,
} from "@/lib/bike-validation";

export default async function updateBike(id: string, formData: FormData) {
  await requireAdmin();

  if (!id) return;
  const brand = String(formData.get("brand") ?? "").trim();
  const model = String(formData.get("model") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const pricePerDayRaw = String(formData.get("price_per_day") ?? "").trim();
  const image = String(formData.get("image") ?? "");
  const bikeCategoryId = String(formData.get("bike_category_id") ?? "");

  const brandError = validateBikeTextField("Brand", brand);
  if (brandError) {
    throw new Error(brandError);
  }

  const modelError = validateBikeTextField("Model", model);
  if (modelError) {
    throw new Error(modelError);
  }

  const descriptionError = validateBikeTextField("Description", description);
  if (descriptionError) {
    throw new Error(descriptionError);
  }

  const priceError = validateBikePrice(pricePerDayRaw);
  if (priceError) {
    throw new Error(priceError);
  }

  const category = await db
    .select()
    .from(categories)
    .where(eq(categories.id, bikeCategoryId))
    .limit(1);

  if (!category[0]) {
    throw new Error("Categories not found!");
  }

  await db
    .update(bikes)
    .set({
      brand,
      model,
      description,
      pricePerDay: normalizeBikePrice(pricePerDayRaw),
      image,
      bikeCategoryId,
    })
    .where(eq(bikes.id, id));
  revalidatePath("/admin");
}
