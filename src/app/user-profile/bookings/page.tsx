import AccountSummarySection from "@/components/profile/bookings/AccountSummarySection";
import CurrentBookingsSection from "@/components/profile/bookings/CurrentBookingsSection";
import PastBookingsSection from "@/components/profile/bookings/PastBookingsSection";
import { getUserBookings } from "@/app/api/actions-booking/get-user-bookings";
import { mapBookingRowsToListItems } from "@/lib/bookings/bookings.mapper";
import { buildBookingsPageData } from "@/lib/bookings/bookings.service";

export default async function BookingHistoryPage() {
  const rows = await getUserBookings();
  const bookingItems = mapBookingRowsToListItems(rows);
  const { currentBookings, pastBookings, summary } =
    buildBookingsPageData(bookingItems);

  return (
    <div className="space-y-6">
      <CurrentBookingsSection bookings={currentBookings} />
      <PastBookingsSection bookings={pastBookings} />
      <AccountSummarySection summary={summary} />
    </div>
  );
}
