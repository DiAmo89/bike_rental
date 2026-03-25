"use client";

import {
  createCategoryAction,
  type CreateCategoryState,
} from "@/app/api/actions-category/create-category";
import { useActionState } from "react";

const initialState: CreateCategoryState = {
  error: null,
  values: {
    name: "",
    image: "",
  },
};

export default function AddCategoryForm() {
  const [state, formAction] = useActionState(
    createCategoryAction,
    initialState,
  );

  return (
    <form action={formAction} className="grid gap-4 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          name="name"
          type="text"
          placeholder="Category name"
          className="w-full rounded border p-3"
          defaultValue={state.values.name}
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
          defaultValue={state.values.image}
          required
        />
      </div>

      <div className="md:col-span-2 min-h-6">
        {state.error && (
          <p className="text-sm text-red-600" role="alert">
            {state.error}
          </p>
        )}
      </div>

      <div className="md:col-span-2">
        <button type="submit" className="rounded bg-black px-5 py-3 text-white">
          Create Category
        </button>
      </div>
    </form>
  );
}
