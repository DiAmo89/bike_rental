"use server";

import { accessories } from "@/db/tables/accessories";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function deleteAccessory(id: string) {
  if (!id) return;
  await db.delete(accessories).where(eq(accessories.id, id));
  revalidatePath("/admin");
}
