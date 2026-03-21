import getAllCategories from "@/app/api/actions-category/read-all-categories";
import createCategory from "@/app/api/actions-category/create-category";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AddCategoryPage() {
  const categories = await getAllCategories();

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[210px_1fr] items-start">
      <div className="self-start">
        <AdminSidebar />
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-gray-500">Create and review bike categories</p>
        </div>

        <div className="flex gap-6">
          <div className="rounded-xl bg-gray-100 px-6 py-4 text-lg font-semibold">
            Total Categories: {categories.length}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
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

        <table className="w-full rounded-xl border border-gray-200 bg-white text-left">
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
                <td className="break-all px-6 py-4">{category.image}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
