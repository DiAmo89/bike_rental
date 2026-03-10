import UserProfileCard from "@/components/profile/UserProfileCard";
import { mockUser } from "@/mocks/user";

export default function UserProfilePage() {
  return <UserProfileCard user={mockUser} />;
}