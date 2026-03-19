import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { getUserByEmail } from "@/app/api/user/get-current-user";
import AdminPanel from "@/components/admin/AdminPanel";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // 1. Verificăm dacă userul este logat
  if (!session?.user?.email) {
    redirect("/login");
  }

  // 2. Verificăm dacă userul există în baza de date
  const user = await getUserByEmail(session.user.email);
  if (!user) {
    redirect("/login");
  }

  // 3. Verificăm dacă userul are rolul ADMIN
  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <main className=" m-10 p-8 space-y-6">
      <AdminPanel />
    </main>
  );
}
