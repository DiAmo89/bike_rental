export default function ActiveBookingCard() {
    return (
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
  
              <p className="text-lg text-gray-600">Mountain Bike • 21-speed</p>
  
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-base text-gray-700">
                <p>
                  <span className="font-medium">Pick-up:</span> Jan 20, 10:00 AM
                </p>
                <p>
                  <span className="font-medium">Return:</span> Jan 22, 10:00 AM
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
    );
  }