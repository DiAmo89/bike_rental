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
import { deleteOldAssetAfterReplace } from "@/lib/cloudinary/deleteOldAssetAfterReplace";

export default async function updateBike(id: string, formData: FormData) {
  await requireAdmin();

  if (!id) return;

  const brand = String(formData.get("brand") ?? "").trim();
  const model = String(formData.get("model") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const pricePerDayRaw = String(formData.get("price_per_day") ?? "").trim();
  const image = String(formData.get("image") ?? "");
  const imageKey = String(formData.get("imageKey") ?? "");
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
    throw new Error("Category not found!");
  }

  const existingBike = await db
    .select()
    .from(bikes)
    .where(eq(bikes.id, id))
    .limit(1);

  const currentBike = existingBike[0];

  if (!currentBike) {
    throw new Error("Bike not found!");
  }

  const oldImageKey = currentBike.imageKey ?? null;

  await db
    .update(bikes)
    .set({
      brand,
      model,
      description,
      pricePerDay: normalizeBikePrice(pricePerDayRaw),
      image,
      imageKey,
      bikeCategoryId,
    })
    .where(eq(bikes.id, id));

  await deleteOldAssetAfterReplace({
    oldKey: oldImageKey,
    newKey: imageKey,
  });

  revalidatePath("/admin");
}