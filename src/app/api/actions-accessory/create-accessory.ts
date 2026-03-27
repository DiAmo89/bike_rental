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

function getErrorCode(error: unknown): string | null {
  if (typeof error !== "object" || error === null) {
    return null;
  }
  if ("code" in error && typeof error.code === "string") {
    return error.code;
  }
  if ("cause" in error) {
    return getErrorCode((error as { cause: unknown }).cause);
  }
  return null;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error ?? "");
}

function isUniqueConstraintError(error: unknown) {
  if (getErrorCode(error) === "23505") return true;
  const msg = getErrorMessage(error).toLowerCase();
  return msg.includes("duplicate key") || msg.includes("unique constraint");
}

export default async function createAccessory(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const pricePerDayRaw = String(formData.get("price_per_day") ?? "").trim();

  const nameError = validateAccessoryName(name);
  if (nameError) throw new Error(nameError);

  const priceError = validateAccessoryPrice(pricePerDayRaw);
  if (priceError) throw new Error(priceError);

  const pricePerDay = normalizeAccessoryPrice(pricePerDayRaw);

  try {
    await db.insert(accessories).values({ name, pricePerDay });
  } catch (err: unknown) {
    if (isUniqueConstraintError(err)) {
      throw new Error("Accessory with this name already exists");
    }
    throw err;
  }
  revalidatePath("/admin");
}
