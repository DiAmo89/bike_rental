import type { User } from "@/db/tables/users";
import type { CurrentUser } from "@/types/CurrentUser";

export function mapUserToCurrentUser(user: User): CurrentUser {
  return {
    id: user.id,
    email: user.email,
    full_name: user.fullName,
    telephone: user.phone ?? "",
    role: user.role,
    avatar: user.avatar ?? null,
  };
}