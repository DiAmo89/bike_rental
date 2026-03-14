"use server";

import { accessories } from "@/db/tables/accessories";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";

export default async function getAccessoryById(id: string) {
  const result = await db
    .select()
    .from(accessories)
    .where(eq(accessories.id, id))
    .limit(1);
  return result[0];
}