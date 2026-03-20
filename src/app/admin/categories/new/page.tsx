import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { getUserByEmail } from "@/app/api/user/get-current-user";
import getAllCategories from "@/app/api/actions-category/read-all-categories";
import createCategory from "@/app/api/actions-category/create-category";

export default async function AddCategoryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await getUserByEmail(session.user.email);

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  const categories = await getAllCategories();

  return (
    <main className="m-10 container mx-auto py-10">
      <div className="flex items-center mb-6">
        <Link
          href="/admin"
          className="mr-4 flex items-center text-sm font-bold text-gray-400 hover:text-black transition-colors group uppercase"
        >
          <span className="mr-2 transition-transform group-hover:-translate-x-1">
            ←
          </span>
          Back to Admin Panel
        </Link>

        <h1 className="text-3xl font-bold">Categories</h1>
      </div>

      <div className="mb-6 flex gap-6">
        <div className="bg-gray-100 rounded-xl px-6 py-4 text-lg font-semibold">
          Total Categories: {categories.length}
        </div>
      </div>

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Add Category</h2>

        <form action={createCategory} className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Category name"
              className="w-full rounded border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              name="image"
              type="text"
              placeholder="https://example.com/category.jpg"
              className="w-full rounded border p-3"
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded bg-black px-5 py-3 text-white"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>

      <table className="w-full text-left border border-gray-200 rounded-xl bg-white">
        <thead className="bg-gray-50 text-sm text-gray-600">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Image</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category.id} className="text-sm text-gray-700">
              <td className="px-6 py-4">{category.name}</td>
              <td className="px-6 py-4 break-all">{category.image}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
