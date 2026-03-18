import type { BookingListItem } from "./bookings.types";

type Props = {
  booking: BookingListItem;
};

function formatPrice(value: number) {
  return `€${value.toFixed(2)}`;
}

export default function PastBookingCard({ booking }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm border-b border-gray-100 last:border-none">
      
      {/* Title */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{booking.title}</p>
      </div>

      {/* Dates */}
      <div className="hidden whitespace-nowrap text-gray-500 md:block">
        {booking.startDate} — {booking.endDate}
      </div>

      {/* Price */}
      <div className="whitespace-nowrap font-medium">
        {formatPrice(booking.totalPrice)}
      </div>

      {/* Status */}
      <div className="whitespace-nowrap text-xs text-gray-500">
        Completed
      </div>
    </div>
  );
}
