"use server";

import { accessories } from "@/db/tables/accessories";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";

export default async function createAccessory(formData: FormData) {
  const name = formData.get("name") as string;
  let pricePerDay = formData.get("price_per_day") as string;
  // Validate and convert pricePerDay
  if (!pricePerDay || isNaN(Number(pricePerDay))) {
    throw new Error("Invalid price per day");
  }
  pricePerDay = Number(pricePerDay).toFixed(2);
  await db.insert(accessories).values({ name, pricePerDay });
  revalidatePath("/admin");
}
