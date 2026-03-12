import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { db } from "@/db/db";
import { users } from "@/db/tables/users";
import { eq } from "drizzle-orm";

import type { CurrentUser } from "@/types/CurrentUser";
import { mapUserToCurrentUser } from "./mapUserToCurrentUser";

export async function getCurrentUser(): Promise<CurrentUser | null> {

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  });

  if (!user) {
    return null;
  }

  return mapUserToCurrentUser(user);
}