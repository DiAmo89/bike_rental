import EmptyState from "@/components/admin/EmptyState";
import type { Order } from "@/types/admin";

type OrdersTableProps = {
  orders: Order[];
};

export default function OrdersTable({ orders }: OrdersTableProps) {
  const handleViewOrder = (id: string) => {
    console.log("View order:", id);
  };

  const handleCompleteOrder = (id: string) => {
    console.log("Complete order:", id);
  };

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No active orders"
        description="Active orders will appear here."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-sm text-gray-600">
          <tr>
            <th className="px-6 py-4">Order ID</th>
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Bike</th>
            <th className="px-6 py-4">Start Date</th>
            <th className="px-6 py-4">End Date</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="text-sm text-gray-700">
              <td className="px-6 py-4">{order.id}</td>
              <td className="px-6 py-4">{order.customer}</td>
              <td className="px-6 py-4">{order.bike}</td>
              <td className="px-6 py-4">{order.startDate}</td>
              <td className="px-6 py-4">{order.endDate}</td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                  {order.status}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => handleViewOrder(order.id)}
                    className="text-black hover:underline"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCompleteOrder(order.id)}
                    className="text-black hover:underline"
                  >
                    Complete
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
