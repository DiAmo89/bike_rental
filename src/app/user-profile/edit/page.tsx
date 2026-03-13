import EditProfileForm from "@/components/profile/EditProfileForm";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export default async function EditProfilePage() {

  const user = await getCurrentUser();


  if (!user) {
    return <div>User not found</div>;
  }


  return <EditProfileForm user={user} />;
}