import UserProfileNav from "@/components/profile/UserProfileNav";

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-6xl px-6">
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