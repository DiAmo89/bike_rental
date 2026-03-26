"use client";

import {
  createCategoryAction,
  type CreateCategoryState,
} from "@/app/api/actions-category/create-category";
import {
  validateCategoryName,
  validateImageUrl,
  isValidCategoryNameInput,
  isValidImageUrlInput,
} from "@/lib/category-validation";
import { useActionState, useState } from "react";

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

  const [nameError, setNameError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    name: state.values.name,
    image: state.values.image,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormValues((prev) => ({ ...prev, name: value }));

    // Allow any input, validate on blur
    if (!isValidCategoryNameInput(value)) {
      setNameError("Name contains unsupported special characters");
    } else {
      setNameError(null);
    }
  };

  const handleNameBlur = () => {
    const error = validateCategoryName(formValues.name);
    setNameError(error);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormValues((prev) => ({ ...prev, image: value }));

    // Allow any input, validate on blur
    if (!isValidImageUrlInput(value)) {
      setImageError("Image URL must start with http:// or https://");
    } else {
      setImageError(null);
    }
  };

  const handleImageBlur = () => {
    const error = validateImageUrl(formValues.image);
    setImageError(error);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const nameValidationError = validateCategoryName(formValues.name);
    const imageValidationError = validateImageUrl(formValues.image);

    setNameError(nameValidationError);
    setImageError(imageValidationError);

    if (nameValidationError || imageValidationError) {
      e.preventDefault();
    }
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="grid gap-4 md:grid-cols-2"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          name="name"
          type="text"
          placeholder="Category name"
          className={`w-full rounded border p-3 ${nameError ? "border-red-500" : "border-gray-300"}`}
          value={formValues.name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          required
        />
        {nameError && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {nameError}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          name="image"
          type="text"
          placeholder="https://example.com/category.jpg"
          className={`w-full rounded border p-3 ${imageError ? "border-red-500" : "border-gray-300"}`}
          value={formValues.image}
          onChange={handleImageChange}
          onBlur={handleImageBlur}
          required
        />
        {imageError && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {imageError}
          </p>
        )}
      </div>

      <div className="md:col-span-2 min-h-6">
        {state.error && (
          <p className="text-sm text-red-600" role="alert">
            {state.error}
          </p>
        )}
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={!!nameError || !!imageError}
          className="rounded bg-black px-5 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Category
        </button>
      </div>
    </form>
  );
}
