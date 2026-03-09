export default function AccountSummaryCard() {
    return (
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
    );
  }