"use client";

type AdminActionsProps = {
  onAddBike: () => void;
  onAddAccessory: () => void;
  onAddCategory: () => void;
};

export default function AdminActions({
  onAddBike,
  onAddAccessory,
  onAddCategory,
}: AdminActionsProps) {
  return (
    <section className="flex flex-wrap items-center gap-3 lg:justify-end">
      <button
        type="button"
        onClick={onAddBike}
        className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
      >
        Add Bike
      </button>

      <button
        type="button"
        onClick={onAddAccessory}
        className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-gray-50"
      >
        Add Accessory
      </button>

      <button
        type="button"
        onClick={onAddCategory}
        className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-gray-50"
      >
        Add Category
      </button>
    </section>
  );
}
