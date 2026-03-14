"use server";

import { accessories } from "@/db/tables/accessories";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";

export default async function createAccessory(formData: FormData) {
  const name = formData.get("name") as string;
  const pricePerDay = formData.get("price_per_day") as string;

  await db.insert(accessories).values({ name, pricePerDay });

  revalidatePath("/admin");
}
