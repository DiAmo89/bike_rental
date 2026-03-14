import { db } from "@/db/db";
import { bikes } from "@/db/tables/bikes";
import { eq } from "drizzle-orm";

export async function getBikeById(id: string) {
  const result = await db.select().from(bikes).where(eq(bikes.id, id)).limit(1);
  return result[0];
}
