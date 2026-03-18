import BookingCard from "./BookingCard";
import type { BookingListItem } from "./bookings.types";

type Props = {
  bookings: BookingListItem[];
};

export default function CurrentBookingsSection({ bookings }: Props) {
  const shouldScroll = bookings.length > 2;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Current & Upcoming Bookings</h2>

        <span className="rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700">
          {bookings.length}
        </span>
      </div>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No current or upcoming bookings yet.</p>
      ) : (
        <div className={shouldScroll ? "max-h-175 space-y-4 overflow-y-auto pr-2" : "space-y-4"}>
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} variant="current" />
          ))}
        </div>
      )}
    </section>
  );
}
