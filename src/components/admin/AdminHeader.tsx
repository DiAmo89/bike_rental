type AdminHeaderProps = {
  onAddBike: () => void;
};

export default function AdminHeader({ onAddBike }: AdminHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-500">Manage bikes</p>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onAddBike}
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Add Bike
        </button>
      </div>
    </div>
  );
}
