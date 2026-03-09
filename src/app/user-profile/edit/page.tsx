import EditProfileForm from "@/components/profile/EditProfileForm";
import { User } from "@/common/types/User";

export default function EditProfilePage() {
  const user: User = {
    id: 1,
    email: "dmitrii@example.com",
    password: "",
    name: "Dmitrii",
    role: "CUSTOMER",
    avatar: "",
    telephone: "+49 123 456 789",
  };

  return (
    <main className="mx-auto max-w-2xl px-4 pt-20">
      <EditProfileForm user={user} />
    </main>
  );
}