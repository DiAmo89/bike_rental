import Link from "next/link";

export default function PastBookingsCard() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Past Bookings</h2>

        <Link
          href="/user-profile/bookings/all"
          className="text-sm font-medium text-gray-600 transition hover:text-black"
        >
          All bookings →
        </Link>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gray-200 text-sm text-gray-500">
              City Bike
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Giant Escape 3</h3>
              <p className="text-lg text-gray-600">Jan 10 - Jan 12, 2025</p>
              <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                Completed
              </span>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-3xl font-semibold">€54.00</p>
            <button className="mt-2 text-lg font-medium text-gray-600 transition hover:text-black">
              View Receipt
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gray-200 text-sm text-gray-500">
              Electric Bike
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Cannondale Quick Neo</h3>
              <p className="text-lg text-gray-600">Dec 28 - Dec 30, 2024</p>
              <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                Completed
              </span>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-3xl font-semibold">€135.00</p>
            <button className="mt-2 text-lg font-medium text-gray-600 transition hover:text-black">
              View Receipt
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}