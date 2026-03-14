"use server";

import { accessories } from "@/db/tables/accessories";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function updateAccessory(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const pricePerDay = formData.get("price_per_day") as string;

  await db
    .update(accessories)
    .set({ name, pricePerDay })
    .where(eq(accessories.id, id));

  revalidatePath("/admin");
}
