"use server";

import { accessories } from "@/db/tables/accessories";
import { db } from "@/db/db";

export default async function getAccessories() {
  return await db.select().from(accessories);
}