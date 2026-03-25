import { useState, ChangeEvent, FormEvent } from "react";
import {
  isValidAccessoryNameInput,
  isValidAccessoryPriceInput,
  validateAccessoryName,
  validateAccessoryPrice,
} from "@/lib/accessory-validation";

interface AddAccessoryModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddAccessoryModal({
  open,
  onClose,
  onSuccess,
}: AddAccessoryModalProps) {
  const [form, setForm] = useState({
    name: "",
    price_per_day: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "name" && !isValidAccessoryNameInput(value)) {
      return;
    }

    if (name === "price_per_day" && !isValidAccessoryPriceInput(value)) {
      return;
    }

    setForm({ ...form, [name]: value });
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const nameError = validateAccessoryName(form.name);

    if (nameError) {
      setLoading(false);
      setError(nameError);
      return;
    }

    const priceError = validateAccessoryPrice(form.price_per_day);

    if (priceError) {
      setLoading(false);
      setError(priceError);
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value),
      );
      const response = await fetch("/api/actions-accessory", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Create failed");
      }

      setForm({
        name: "",
        price_per_day: "",
      });
      setLoading(false);
      onSuccess();
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Error creating accessory");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Add Accessory</h2>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="mb-2 w-full border p-2 rounded"
          autoComplete="off"
          required
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
