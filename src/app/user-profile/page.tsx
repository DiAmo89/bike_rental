import UserProfileCard from "@/components/profile/UserProfileCard";
import { mockUser } from "@/common/mocks/user";

export default function UserProfilePage() {
  return <UserProfileCard user={mockUser} />;
}