import { useState, ChangeEvent, FormEvent } from "react";
import { createBike } from "@/app/api/actions-bike/create-bike";

import { Category } from "@/types/Category";

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
  const [form, setForm] = useState({
    brand: "",
    model: "",
    description: "",
    price_per_day: "",
    image: "",
    bike_category_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const price = Number(form.price_per_day);

    if (Number.isNaN(price) || price < 0) {
      setLoading(false);
      setError("Price per day must be 0 or greater");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value),
      );

      await createBike(formData);

      setLoading(false);
      onSuccess();
      onClose();
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error creating bike");
      }
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

        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="mb-2 w-full border p-2 rounded"
          required
        />

        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Model"
          className="mb-2 w-full border p-2 rounded"
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
          type="number"
          min="0"
          step="0.01"
          className="mb-2 w-full border p-2 rounded"
          required
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="mb-2 w-full border p-2 rounded"
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
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
