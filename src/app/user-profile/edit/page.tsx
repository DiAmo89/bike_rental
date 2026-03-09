import EditProfileForm from "@/components/profile/EditProfileForm";
import { mockUser } from "@/common/mocks/user";

export default function EditProfilePage() {
  return <EditProfileForm user={mockUser} />;
}