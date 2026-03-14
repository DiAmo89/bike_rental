"use server";

import { bikes } from "@/db/tables/bikes";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function deleteBike(id: string) {
  if (!id) return;
  await db.delete(bikes).where(eq(bikes.id, id));
  revalidatePath("/admin");
}
