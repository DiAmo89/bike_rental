"use client";
import { useEffect, useState } from "react";
import React from "react";

export default function AdminAccessoriesPage() {
  const [accessories, setAccessories] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>({});
  const [editId, setEditId] = useState<string | null>(null);
  const handleDeleteAccessory = async (id: string) => {
    await fetch(`/api/actions-accessory/delete-accessory?id=${id}`, {
      method: "POST",
    });
    fetch("/api/actions-accessory/read-all-accessories")
      .then((res) => res.json())
      .then((accs) => setAccessories(accs));
  };

  const handleEditAccessory = (acc: any) => {
    setEditForm({
      name: acc.name || "",
      price_per_day: acc.pricePerDay || "",
    });
    setEditId(acc.id);
    setEditModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(editForm).forEach(([key, value]) =>
      formData.append(key, String(value)),
    );
    await fetch(`/api/actions-accessory/update-accessory?id=${editId}`, {
      method: "POST",
      body: formData,
    });
    setEditModalOpen(false);
    fetch("/api/actions-accessory/read-all-accessories")
      .then((res) => res.json())
      .then((accs) => setAccessories(accs));
  };
  useEffect(() => {
    fetch("/api/actions-accessory/read-all-accessories")
      .then((res) => res.json())
      .then((accs) => setAccessories(accs));
  }, []);

  return (
    <div className="m-10 container mx-auto py-10">
      <div className="flex items-center mb-6">
        <button
          className="mr-4 flex items-center text-sm font-bold text-gray-400 hover:text-black transition-colors group uppercase"
          onClick={() => (window.location.href = "/admin")}
        >
          <span className="mr-2 transition-transform group-hover:-translate-x-1">
            ←
          </span>
          Back to Admin Panel
        </button>
        <h1 className="text-3xl font-bold">Accessories</h1>
      </div>
      <div className="mb-6 flex gap-6">
        <div className="bg-gray-100 rounded-xl px-6 py-4 text-lg font-semibold">
          Total Accessories: {accessories.length}
        </div>
        {/* Poți adăuga aici alte statistici dacă vrei */}
      </div>
      <table className="w-full text-left border border-gray-200 rounded-xl bg-white">
        <thead className="bg-gray-50 text-sm text-gray-600">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Price/Day</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {accessories.map((acc: any) => (
            <tr key={acc.id} className="text-sm text-gray-700">
              <td className="px-6 py-4">{acc.name}</td>
              <td className="px-6 py-4">€{acc.pricePerDay}</td>
              <td className="px-6 py-4">
                <button
                  className="mr-2 text-blue-600"
                  onClick={() => handleEditAccessory(acc)}
                >
                  ✏️
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDeleteAccessory(acc.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <form
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            onSubmit={handleEditSubmit}
          >
            <h2 className="text-xl font-bold mb-4">Edit Accessory</h2>
            <input
              name="name"
              value={editForm.name || ""}
              onChange={handleEditChange}
              placeholder="Name"
              className="mb-2 w-full border p-2 rounded"
              required
            />
            <input
              name="price_per_day"
              value={editForm.price_per_day || ""}
              onChange={handleEditChange}
              placeholder="Price per day"
              type="number"
              className="mb-2 w-full border p-2 rounded"
              required
            />
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
