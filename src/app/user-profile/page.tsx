import UserProfileCard from "@/components/profile/UserProfileCard";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export default async function UserProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>User not found</div>;
  }

  return <UserProfileCard user={user} />;
}