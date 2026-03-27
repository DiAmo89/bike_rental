"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { createBike } from "@/app/api/actions-bike/create-bike";
import { Category } from "@/types/Category";
import BikeImageUpload from "@/components/admin/bikes/BikeImageUpload";
import SubmitButton from "../ui/submit-form-button";
import {
  isValidBikePriceInput,
  isValidBikeTextInput,
  validateBikePrice,
  validateBikeTextField,
} from "@/lib/bike-validation";

type AddBikeModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categories: Category[];
};

export default function AddBikeModal({
  open,
  onClose,
  onSuccess,
  categories,
}: AddBikeModalProps) {
  const getEmptyForm = () => ({
    brand: "",
    model: "",
    description: "",
    price_per_day: "",
    image: "",
    imageKey: "",
    bike_category_id: "",
  });

  const [form, setForm] = useState(getEmptyForm());
  const [loading, setLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (
      (name === "brand" || name === "model" || name === "description") &&
      !isValidBikeTextInput(value)
    ) {
      return;
    }

    if (name === "price_per_day" && !isValidBikePriceInput(value)) {
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleClose = () => {
    setForm(getEmptyForm());
    setError("");
    setIsUploadingImage(false);
    onClose();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isUploadingImage) return;

    setLoading(true);
    setError("");

    const brandError = validateBikeTextField("Brand", form.brand);
    if (brandError) {
      setLoading(false);
      setError(brandError);
      return;
    }

    const modelError = validateBikeTextField("Model", form.model);
    if (modelError) {
      setLoading(false);
      setError(modelError);
      return;
    }

    const priceError = validateBikePrice(form.price_per_day);
    if (priceError) {
      setLoading(false);
      setError(priceError);
      return;
    }

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await createBike(formData);

      onSuccess();
      handleClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error creating bike");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Add Bike</h2>

        <BikeImageUpload
          value={form.image}
          assetKey={form.imageKey}
          onChange={({ url, key }) =>
            setForm((prev) => ({
              ...prev,
              image: url,
              imageKey: key,
            }))
          }
          onUploadingChange={setIsUploadingImage}
        />

        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="mt-3 mb-2 w-full border p-2 rounded"
          autoComplete="off"
          required
        />

        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Model"
          className="mb-2 w-full border p-2 rounded"
          autoComplete="off"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="mb-2 w-full border p-2 rounded"
        />

        <input
          name="price_per_day"
          value={form.price_per_day}
          onChange={handleChange}
          placeholder="Price per day"
          type="text"
          inputMode="decimal"
          step="0.01"
          className="mb-2 w-full border p-2 rounded"
          required
        />

        <select
          name="bike_category_id"
          value={form.bike_category_id}
          onChange={handleChange}
          className="mb-2 w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat: Category) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {error && <div className="text-red-500 mb-2">{error}</div>}

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={handleClose}
            disabled={loading || isUploadingImage}
          >
            Cancel
          </button>

          <SubmitButton disabled={loading || isUploadingImage} />
        </div>
      </form>
    </div>
  );
}