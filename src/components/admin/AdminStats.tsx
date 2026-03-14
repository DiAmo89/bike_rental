type AdminStatsProps = {
  totalBikes: number;
  activeOrders: number;
  inRepair: number;
};

export default function AdminStats({
  totalBikes,
  activeOrders,
  inRepair,
}: AdminStatsProps) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">Total Bikes</p>
        <h2 className="mt-3 text-4xl font-semibold text-black">{totalBikes}</h2>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">Active Orders</p>
        <h2 className="mt-3 text-4xl font-semibold text-black">
          {activeOrders}
        </h2>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">In Repair</p>
        <h2 className="mt-3 text-4xl font-semibold text-black">{inRepair}</h2>
      </div>
    </section>
  );
}
