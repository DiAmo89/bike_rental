export default function UserProfile() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-7xl px-6 pt-20">
        <h1 className="mb-8 text-4xl font-semibold tracking-tight">
          My Bookings
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Active Booking</h2>
                <span className="rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700">
                  In Progress
                </span>
              </div>

              <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row">
                <div className="flex gap-4">
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-gray-200 text-sm text-gray-500">
                    Mountain Bike
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-3xl font-semibold leading-tight">
                      Trek X-Caliber 8
                    </h3>
                    <p className="text-lg text-gray-600">
                      Mountain Bike • 21-speed
                    </p>

                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-base text-gray-700">
                      <p>
                        <span className="font-medium">Pick-up:</span> Jan 20,
                        10:00 AM
                      </p>
                      <p>
                        <span className="font-medium">Return:</span> Jan 22,
                        10:00 AM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="min-w-35 text-left md:text-right">
                  <p className="text-4xl font-semibold">€60.50</p>
                  <p className="mt-1 text-lg text-gray-500">Total paid</p>
                </div>
              </div>

              <div className="mb-6 rounded-2xl bg-gray-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-lg font-medium">Time remaining</span>
                  <span className="text-lg text-gray-600">1 day, 5 hours</span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-2/5 rounded-full bg-black" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <button className="rounded-xl border border-gray-300 px-5 py-4 text-lg font-medium transition hover:bg-gray-50">
                  View Details
                </button>
                <button className="rounded-xl bg-black px-5 py-4 text-lg font-medium text-white transition hover:bg-gray-800">
                  Contact Support
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-semibold">Past Bookings</h2>

              <div className="space-y-6">
                <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gray-200 text-sm text-gray-500">
                      City Bike
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold">Giant Escape 3</h3>
                      <p className="text-lg text-gray-600">
                        Jan 10 - Jan 12, 2025
                      </p>
                      <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                        Completed
                      </span>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-3xl font-semibold">€54.00</p>
                    <button className="mt-2 text-lg font-medium text-gray-600 hover:text-black">
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
                      <h3 className="text-2xl font-semibold">
                        Cannondale Quick Neo
                      </h3>
                      <p className="text-lg text-gray-600">
                        Dec 28 - Dec 30, 2024
                      </p>
                      <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                        Completed
                      </span>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-3xl font-semibold">€135.00</p>
                    <button className="mt-2 text-lg font-medium text-gray-600 hover:text-black">
                      View Receipt
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-2xl font-semibold">Quick Actions</h2>

              <div className="space-y-4">
                <button className="w-full rounded-xl bg-black px-5 py-4 text-lg font-medium text-white transition hover:bg-gray-800">
                  Browse Bikes
                </button>

                <button className="w-full rounded-xl border border-gray-300 px-5 py-4 text-lg font-medium transition hover:bg-gray-50">
                  Booking History
                </button>

                <button className="w-full rounded-xl border border-gray-300 px-5 py-4 text-lg font-medium transition hover:bg-gray-50">
                  Edit Profile
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-2xl font-semibold">Account Summary</h2>

              <div className="space-y-4 text-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Bookings:</span>
                  <span className="font-semibold">3</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Rentals:</span>
                  <span className="font-semibold">1</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Spent:</span>
                  <span className="font-semibold">€249.50</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member Since:</span>
                  <span className="font-semibold">Dec 2024</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
