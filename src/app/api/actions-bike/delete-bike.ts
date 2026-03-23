"use server";

import { bikes } from "@/db/tables/bikes";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export default async function deleteBike(id: string) {
  // Verificăm dacă userul este ADMIN
  await requireAdmin();

  if (!id) return;
  await db.delete(bikes).where(eq(bikes.id, id));
  revalidatePath("/admin");
}
