type AdminHeaderProps = {
  onAddBike: () => void;
  onAddAccessory: () => void;
  onAddCategory: () => void;
};

export default function AdminHeader({
  onAddBike,
  onAddAccessory,
  onAddCategory,
}: AdminHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-500">Manage bikes and orders</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          onClick={() => (window.location.href = "/admin/accessories")}
        >
          Go to Accessories
        </button>

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
      </div>
    </div>
  );
}
