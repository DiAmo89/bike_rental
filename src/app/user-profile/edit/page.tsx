import EditProfileForm from "@/components/profile/EditProfileForm";
import { User } from "@/common/types/User";
import { mockUser } from "@/common/mocks/user";

export default function EditProfilePage() {


  return (
    <main className="mx-auto max-w-2xl px-4 pt-20">
      <EditProfileForm user={mockUser} />
    </main>
  );
}