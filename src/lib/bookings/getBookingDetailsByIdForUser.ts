import { and, eq } from "drizzle-orm";

import { db } from "@/db/db";
import { bookings } from "@/db/tables/bookings";
import { bikes } from "@/db/tables/bikes";
import { accessories } from "@/db/tables/accessories";
import { bookingAccessories } from "@/db/tables/booking-accessories";

export async function getBookingDetailsByIdForUser(
  bookingId: string,
  userId: string
) {
  const rows = await db
    .select({
      bookingId: bookings.id,
      bookingUserId: bookings.userId,
      startDate: bookings.startDate,
      endDate: bookings.endDate,
      totalPrice: bookings.totalPrice,
      createdAt: bookings.createdAt,

      bikeId: bikes.id,
      bikeBrand: bikes.brand,
      bikeModel: bikes.model,
      bikeDescription: bikes.description,
      bikeImage: bikes.image,
      bikePricePerDay: bikes.pricePerDay,

      accessoryId: accessories.id,
      accessoryName: accessories.name,
      accessoryPricePerDay: accessories.pricePerDay,
    })
    .from(bookings)
    .innerJoin(bikes, eq(bookings.bikeId, bikes.id))
    .leftJoin(
      bookingAccessories,
      eq(bookingAccessories.bookingId, bookings.id)
    )
    .leftJoin(
      accessories,
      eq(accessories.id, bookingAccessories.accessoryId)
    )
    .where(and(eq(bookings.id, bookingId), eq(bookings.userId, userId)));

  if (rows.length === 0) {
    return null;
  }

  const firstRow = rows[0];

  return {
    id: firstRow.bookingId,
    userId: firstRow.bookingUserId,
    startDate: firstRow.startDate,
    endDate: firstRow.endDate,
    totalPrice: firstRow.totalPrice,
    createdAt: firstRow.createdAt,
    bike: {
      id: firstRow.bikeId,
      brand: firstRow.bikeBrand,
      model: firstRow.bikeModel,
      description: firstRow.bikeDescription,
      image: firstRow.bikeImage,
      pricePerDay: firstRow.bikePricePerDay,
    },
    accessories: rows
      .filter((row) => row.accessoryId !== null)
      .map((row) => ({
        id: row.accessoryId!,
        name: row.accessoryName!,
        pricePerDay: row.accessoryPricePerDay!,
      })),
  };
}
