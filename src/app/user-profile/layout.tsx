import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { getUserByEmail } from "@/app/api/user/get-current-user";
import UserProfileNav from "@/components/profile/UserProfileNav";

export default async function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

 
  if (!session?.user?.email) {
    redirect("/login");
  }

 
  const user = await getUserByEmail(session.user.email);
  if (!user) {
    redirect("/login");
  }

  return (
    <main className=" m-20 mx-auto max-w-6xl px-6">
      <h1 className="mb-8 text-3xl font-bold">User Profile</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <UserProfileNav />
        </aside>

        <section>{children}</section>
      </div>
    </main>
  );
}
