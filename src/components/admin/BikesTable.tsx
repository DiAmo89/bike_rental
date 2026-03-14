import EmptyState from "@/components/admin/EmptyState";
import type { Bike } from "@/types/admin";

type BikesTableProps = {
  bikes: Bike[];
};

export default function BikesTable({ bikes }: BikesTableProps) {
  const handleEditBike = (id: string) => {
    console.log("Edit bike:", id);
  };

  const handleRepairBike = (id: string) => {
    console.log("Repair bike:", id);
  };

  const handleDeleteBike = (id: string) => {
    console.log("Delete bike:", id);
  };

  if (bikes.length === 0) {
    return (
      <EmptyState
        title="No bikes yet"
        description="Add your first bike to start managing inventory."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-sm text-gray-600">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Price/Hour</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {bikes.map((bike) => (
            <tr key={bike.id} className="text-sm text-gray-700">
              <td className="px-6 py-4">{bike.id}</td>
              <td className="px-6 py-4">{bike.name}</td>
              <td className="px-6 py-4">{bike.type}</td>
              <td className="px-6 py-4">€{bike.price}</td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                  {bike.status}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3 text-base">
                  <button
                    type="button"
                    onClick={() => handleEditBike(bike.id)}
                  >
                    ✏️
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRepairBike(bike.id)}
                  >
                    🔧
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteBike(bike.id)}
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
