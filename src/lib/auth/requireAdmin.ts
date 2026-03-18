import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";
import { getUserByEmail } from "@/app/api/user/get-current-user";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await getUserByEmail(session.user.email);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "ADMIN") {
    throw new Error("Admin access required");
  }

  return user;
}
