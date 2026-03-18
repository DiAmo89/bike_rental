import UserProfileCard from "@/components/profile/UserProfileCard";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export default async function UserProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return <UserProfileCard user={user} />;
}
