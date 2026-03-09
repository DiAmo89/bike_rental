import AccountSummaryCard from "@/components/profile/AccountSummaryCard";
import ActiveBookingCard from "@/components/profile/ActiveBookingCard";
import PastBookingsCard from "@/components/profile/PastBookingsCard";


export default function BookingHistoryPage() {
  return (
    <div className="space-y-6">
      <ActiveBookingCard />
      <PastBookingsCard />
      <AccountSummaryCard />
    </div>
  );
}