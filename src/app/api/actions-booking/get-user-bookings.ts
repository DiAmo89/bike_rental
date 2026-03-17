"use server";

import { db } from "@/db/db";
import { bookings } from "@/db/tables/bookings";
import { bikes } from "@/db/tables/bikes";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { eq, desc } from "drizzle-orm";

export async function getUserBookings() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const rows = await db
    .select({
      id: bookings.id,
      startDate: bookings.startDate,
      endDate: bookings.endDate,
      totalPrice: bookings.totalPrice,
      createdAt: bookings.createdAt,
      updatedAt: bookings.updatedAt,

      bikeId: bikes.id,
      brand: bikes.brand,
      model: bikes.model,
      description: bikes.description,
      image: bikes.image,
      pricePerDay: bikes.pricePerDay,
    })
    .from(bookings)
    .innerJoin(bikes, eq(bookings.bikeId, bikes.id))
    .where(eq(bookings.userId, user.id))
    .orderBy(desc(bookings.startDate));

  return rows;
}
