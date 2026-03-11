import type { User } from "@/types/User";
import type { CurrentUser } from "@/types/CurrentUser";

export function mapUserToCurrentUser(user: User): CurrentUser {
  return {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    telephone: user.telephone,
    role: user.role,
    avatar: null,
  };
}