"use server";

import { categories } from "@/db/tables/categories";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";

export default async function getCategoryById(id: string) {
  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);
  return result[0];
}