import EmptyState from "@/components/admin/EmptyState";
import type { Bike } from "@/types/admin";
import deleteBike from "@/app/api/actions-bike/delete-bike";

type BikesTableProps = {
  bikes: Bike[];
  onDeleteSuccess: () => Promise<void>;
};

export default function BikesTable({
  bikes,
  onDeleteSuccess,
}: BikesTableProps) {
  const handleEditBike = (id: string) => {
    // TODO: Implement edit modal or redirect
    alert(`Edit bike: ${id}`);
  };

  const handleRepairBike = (id: string) => {
    alert(`Repair bike: ${id}`);
  };

  const handleDeleteBike = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this bike?");
    if (!confirmed) return;

    try {
      await deleteBike(id);
      await onDeleteSuccess();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete bike");
    }
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
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Price/Day</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {bikes.map((bike) => (
            <tr key={bike.id} className="text-sm text-gray-700">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={bike.image || "/images/default-bicycle.png"}
                    alt={bike.name}
                    className="h-10 w-10 rounded-md object-cover border border-gray-200"
                  />
                  <span>{bike.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">{bike.type}</td>
              <td className="px-6 py-4">€{bike.price}</td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                  {bike.status}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3 text-base">
                  <button type="button" onClick={() => handleEditBike(bike.id)}>
                    ✏️
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
