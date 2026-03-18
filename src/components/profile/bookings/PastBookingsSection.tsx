import PastBookingCard from "./PastBookingCard";
import type { BookingListItem } from "./bookings.types";

type Props = {
  bookings: BookingListItem[];
};

export default function PastBookingsSection({ bookings }: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Booking History</h2>

        <span className="rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700">
          {bookings.length}
        </span>
      </div>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No completed bookings yet.</p>
      ) : (
        <div className="max-h-[400px] overflow-y-auto">
          {bookings.map((booking) => (
            <PastBookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </section>
  );
}
