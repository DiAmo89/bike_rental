import getAllCategories from "@/app/api/actions-category/read-all-categories";
import AddCategoryForm from "@/components/admin/AddCategoryForm";
import AdminSidebar from "@/components/admin/AdminSidebar";
import CategoriesTable from "@/components/admin/CategoriesTable";

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

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-bold">Add Category</h2>

          <AddCategoryForm />
        </div>

        <CategoriesTable initialCategories={categories} />
      </div>
    </div>
  );
}
