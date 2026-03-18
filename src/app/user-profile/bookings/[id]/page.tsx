import { notFound } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getBookingDetailsByIdForUser } from "@/lib/bookings/getBookingDetailsByIdForUser";
import BookingDetailsCard from "@/components/profile/bookings/BookingDetailsCard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookingDetailsPage({ params }: Props) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    notFound();
  }

  const { id } = await params;

  const booking = await getBookingDetailsByIdForUser(id, currentUser.id);

  if (!booking) {
    notFound();
  }

  return <BookingDetailsCard booking={booking} />;
}
