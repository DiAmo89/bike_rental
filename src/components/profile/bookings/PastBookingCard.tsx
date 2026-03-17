import type { BookingListItem } from "./bookings.types";

type Props = {
  booking: BookingListItem;
};

function formatPrice(value: number) {
  return `€${value.toFixed(2)}`;
}

export default function PastBookingCard({ booking }: Props) {
  return (
    <article className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
      
      {/* Левая часть */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{booking.title}</p>
      </div>

      {/* Даты */}
      <div className="hidden whitespace-nowrap text-gray-600 md:block">
        {booking.startDate} — {booking.endDate}
      </div>

      {/* Цена */}
      <div className="whitespace-nowrap font-medium">
        {formatPrice(booking.totalPrice)}
      </div>

      {/* Статус */}
      <div className="whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
        Completed
      </div>
    </article>
  );
}
