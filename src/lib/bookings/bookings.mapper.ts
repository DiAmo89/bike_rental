import type { BookingListItemBase } from "@/components/profile/bookings/bookings.types";

export type UserBookingRow = {
  id: string;
  startDate: string;
  endDate: string;
  totalPrice: string;
  createdAt: Date;
  updatedAt: Date;
  bikeId: string;
  brand: string | null;
  model: string | null;
  description: string | null;
  image: string | null;
  pricePerDay: string;
};

function buildBookingTitle(brand: string | null, model: string | null) {
  return [brand, model].filter(Boolean).join(" ") || "Bike";
}

function buildBookingSubtitle(description: string | null) {
  return description || "Bike booking";
}

export function mapBookingRowToListItem(
  row: UserBookingRow
): BookingListItemBase {
  return {
    id: row.id,
    title: buildBookingTitle(row.brand, row.model),
    subtitle: buildBookingSubtitle(row.description),
    image: row.image,
    startDate: row.startDate,
    endDate: row.endDate,
    totalPrice: Number(row.totalPrice),
  };
}

export function mapBookingRowsToListItems(
  rows: UserBookingRow[]
): BookingListItemBase[] {
  return rows.map(mapBookingRowToListItem);
}
