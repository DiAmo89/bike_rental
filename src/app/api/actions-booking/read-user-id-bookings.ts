"use server";

import { db } from "@/db/db";
import { bookings } from "@/db/tables/bookings";
import { bikes } from "@/db/tables/bikes";
import { eq, desc } from "drizzle-orm";

export async function getBookingsByUserId(userId: string) {
  try {
    if (!userId) return [];

    const data = await db
      .select({
        id: bookings.id,
        startDate: bookings.startDate,
        endDate: bookings.endDate,
        totalPrice: bookings.totalPrice,
        firstName: bookings.firstName,
        lastName: bookings.lastName,
        email: bookings.email,
        phone: bookings.phone,
        bikeModel: bikes.model,
        bikeBrand: bikes.brand,
      })
      .from(bookings)
      .innerJoin(bikes, eq(bookings.bikeId, bikes.id))
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));

    return data;
  } catch (err: unknown) {
    console.error("Read User Bookings Error:", err);
    return [];
  }
}