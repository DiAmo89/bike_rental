import { users } from "@/db";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  const result = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  return result;
}
