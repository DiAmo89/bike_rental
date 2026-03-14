import { db } from "@/db/db";
import { bikes } from "@/db/tables/bikes";

export async function getBikes() {
  return await db.select().from(bikes);
}
