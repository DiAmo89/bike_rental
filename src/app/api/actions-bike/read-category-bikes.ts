import { bikes } from "@/db/tables/bikes";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";

export default async function getBikesByCategory(categoryId: string) {
  return await db
    .select()
    .from(bikes)
    .where(eq(bikes.bikeCategoryId, categoryId));
}
