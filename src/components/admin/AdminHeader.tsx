export default function AdminHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-500">Manage bikes and orders</p>
      <button
        className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        onClick={() => (window.location.href = "/admin/accessories")}
      >
        Go to Accessories
      </button>
    </div>
  );
}
