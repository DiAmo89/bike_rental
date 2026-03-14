"use server";

import { categories } from "@/db/tables/categories";
import { db } from "@/db/db";

export default async function getAllCategories() {
  return await db.select().from(categories);
}
