"use server";

import { accessories } from "@/db/tables/accessories";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import {
  normalizeAccessoryPrice,
  validateAccessoryName,
  validateAccessoryPrice,
} from "@/lib/accessory-validation";

export default async function createAccessory(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const pricePerDayRaw = String(formData.get("price_per_day") ?? "").trim();

  const nameError = validateAccessoryName(name);

  if (nameError) {
    throw new Error(nameError);
  }

  const priceError = validateAccessoryPrice(pricePerDayRaw);

  if (priceError) {
    throw new Error(priceError);
  }

  const pricePerDay = normalizeAccessoryPrice(pricePerDayRaw);

  await db.insert(accessories).values({ name, pricePerDay });
  revalidatePath("/admin");
}
