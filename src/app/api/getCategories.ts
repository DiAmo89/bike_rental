import { categories } from "@/db/tables/categories";
import { db } from "@/db/db";

export async function GET() {
  const cats = await db.select().from(categories);
  return Response.json(cats);
}
