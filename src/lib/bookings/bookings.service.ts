import type {
    BookingListItem,
    BookingListItemBase,
    BookingStatus,
    BookingSummary,
    BookingsPageData,
  } from "@/components/profile/bookings/bookings.types";
  
  export function getBookingStatus(
    startDate: string,
    endDate: string
  ): BookingStatus {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (start > today) return "upcoming";
    if (end < today) return "completed";
    return "active";
  }
  
  export function enrichBookingsWithStatus(
    bookings: BookingListItemBase[]
  ): BookingListItem[] {
    return bookings.map((booking) => ({
      ...booking,
      status: getBookingStatus(booking.startDate, booking.endDate),
    }));
  }
  
  export function splitBookings(bookings: BookingListItem[]) {
    return {
      currentBookings: bookings.filter(
        (booking) => booking.status === "active" || booking.status === "upcoming"
      ),
      pastBookings: bookings.filter(
        (booking) => booking.status === "completed"
      ),
    };
  }
  
  export function getBookingSummary(bookings: BookingListItem[]): BookingSummary {
    return {
      total: bookings.length,
      active: bookings.filter((booking) => booking.status === "active").length,
      upcoming: bookings.filter((booking) => booking.status === "upcoming").length,
      completed: bookings.filter((booking) => booking.status === "completed").length,
      totalSpent: bookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
    };
  }
  
  export function buildBookingsPageData(
    bookings: BookingListItemBase[]
  ): BookingsPageData {
    const bookingsWithStatus = enrichBookingsWithStatus(bookings);
    const { currentBookings, pastBookings } = splitBookings(bookingsWithStatus);
    const summary = getBookingSummary(bookingsWithStatus);
  
    return {
      currentBookings,
      pastBookings,
      summary,
    };
  }
  