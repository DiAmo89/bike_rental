import { useState, ChangeEvent, FormEvent } from "react";

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value),
      );
      await fetch("/api/actions-accessory/create-accessory", {
        method: "POST",
        body: formData,
      });
      setLoading(false);
      onSuccess();
      onClose();
    } catch (err) {
      setLoading(false);
      setError("Error creating accessory");
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
          required
        />
        <input
          name="price_per_day"
          value={form.price_per_day}
          onChange={handleChange}
          placeholder="Price per day"
          type="number"
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
