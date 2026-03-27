"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import updateBike from "@/app/api/actions-bike/update-bike";
import { Category } from "@/types/Category";
import BikeImageUpload from "@/components/admin/bikes/BikeImageUpload";
import SubmitButton from "../ui/submit-form-button";
import {
  isValidBikePriceInput,
  isValidBikeTextInput,
  validateBikePrice,
  validateBikeTextField,
} from "@/lib/bike-validation";

type BikeDetails = {
  id: string;
  brand: string;
  model: string;
  description: string | null;
  pricePerDay: string;
  image: string | null;
  imageKey: string | null;
  bikeCategoryId: string;
};

type EditBikeModalProps = {
  open: boolean;
  bikeId: string | null;
  onClose: () => void;
  onSuccess: () => void;
  categories: Category[];
};

export default function EditBikeModal({
  open,
  bikeId,
  onClose,
  onSuccess,
  categories,
}: EditBikeModalProps) {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    description: "",
    price_per_day: "",
    image: "",
    imageKey: "",
    bike_category_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingBike, setLoadingBike] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !bikeId) return;

    const loadBike = async () => {
      setLoadingBike(true);
      setError("");

      try {
        const res = await fetch(`/api/actions-bike/read-id-bike?id=${bikeId}`);

        if (!res.ok) {
          throw new Error("Failed to load bike");
        }

        const bike: BikeDetails = await res.json();

        setForm({
          brand: bike.brand ?? "",
          model: bike.model ?? "",
          description: bike.description ?? "",
          price_per_day: bike.pricePerDay ?? "",
          image: bike.image ?? "",
          imageKey: bike.imageKey ?? "",
          bike_category_id: bike.bikeCategoryId ?? "",
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error loading bike");
        }
      } finally {
        setLoadingBike(false);
      }
    };

    loadBike();
  }, [open, bikeId]);

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
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bikeId || isUploadingImage) return;

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

    const descriptionError = validateBikeTextField(
      "Description",
      form.description,
    );
    if (descriptionError) {
      setLoading(false);
      setError(descriptionError);
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

      await updateBike(bikeId, formData);
      await onSuccess();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error updating bike");
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
        <h2 className="text-xl font-bold mb-4">Edit Bike</h2>

        {loadingBike ? (
          <div className="py-6 text-sm text-gray-500">Loading bike...</div>
        ) : (
          <>
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
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </>
        )}

        {error && <div className="text-red-500 mb-2">{error}</div>}

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
            disabled={loading || loadingBike || isUploadingImage}
          >
            Cancel
          </button>

          <SubmitButton disabled={loadingBike || isUploadingImage} />
        </div>
      </form>
    </div>
  );
}