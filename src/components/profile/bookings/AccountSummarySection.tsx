import type { BookingSummary } from "./bookings.types";

type Props = {
  summary: BookingSummary;
};

export default function AccountSummarySection({ summary }: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">Summary</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Total bookings</p>
          <p className="mt-2 text-2xl font-semibold">{summary.total}</p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="mt-2 text-2xl font-semibold">{summary.active}</p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Upcoming</p>
          <p className="mt-2 text-2xl font-semibold">{summary.upcoming}</p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Total spent</p>
          <p className="mt-2 text-2xl font-semibold">
            €{summary.totalSpent.toFixed(2)}
          </p>
        </div>
      </div>
    </section>
  );
}
