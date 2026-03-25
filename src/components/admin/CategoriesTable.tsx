"use client";

import { useMemo, useState } from "react";
import type { Category } from "@/types/Category";
import deleteCategory from "@/app/api/actions-category/delete-category";
import DeleteConfirmationModal from "@/components/admin/DeleteConfirmationModal";

type CategoriesTableProps = {
  initialCategories: Category[];
};

export default function CategoriesTable({
  initialCategories,
}: CategoriesTableProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const hasCategories = categories.length > 0;
  const totalCategories = useMemo(() => categories.length, [categories]);

  const handleDeleteButtonClick = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteError(null);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
    setDeleteError(null);
    setIsDeleting(false);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteCategory(categoryToDelete.id);
      setCategories((prev) =>
        prev.filter((item) => item.id !== categoryToDelete.id),
      );
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete category";
      setDeleteError(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex gap-6">
        <div className="rounded-xl bg-gray-100 px-6 py-4 text-lg font-semibold">
          Total Categories: {totalCategories}
        </div>
      </div>

      {deleteError && (
        <p className="text-sm text-red-600" role="alert">
          {deleteError}
        </p>
      )}

      <table className="w-full rounded-xl border border-gray-200 bg-white text-left">
        <thead className="bg-gray-50 text-sm text-gray-600">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Image</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {hasCategories ? (
            categories.map((category) => (
              <tr key={category.id} className="text-sm text-gray-700">
                <td className="px-6 py-4">{category.name}</td>
                <td className="break-all px-6 py-4">{category.image}</td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    className="px-3 py-1.5 text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteButtonClick(category)}
                    aria-label={`Delete category ${category.name}`}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-sm text-gray-500">
              <td className="px-6 py-4" colSpan={3}>
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <DeleteConfirmationModal
        open={showDeleteModal}
        title="Delete Category"
        description={
          categoryToDelete
            ? `Are you sure you want to delete \"${categoryToDelete.name}\"? This action cannot be undone.`
            : "Are you sure you want to delete this category?"
        }
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
