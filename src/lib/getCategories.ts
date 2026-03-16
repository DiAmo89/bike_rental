import { categories } from "@/db/tables/categories";
import { db } from "@/db/db";

export async function getCategories() {
  return await db.select().from(categories);
}
