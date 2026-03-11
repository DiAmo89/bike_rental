import type { CurrentUser } from "@/types/CurrentUser";
// если нужен маппинг:
import { mockUser } from "@/mocks/user";
import { mapUserToCurrentUser } from "./mapUserToCurrentUser";

export async function getCurrentUser(): Promise<CurrentUser | null> {
    

  return mapUserToCurrentUser(mockUser);
}