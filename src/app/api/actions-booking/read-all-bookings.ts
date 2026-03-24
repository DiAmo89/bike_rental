"use server";

import { db } from "@/db/db";
import { bookings } from "@/db/tables/bookings";
import { bikes } from "@/db/tables/bikes";
import { eq, desc } from "drizzle-orm";

export async function getAllBookings() {
  try {
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
      .orderBy(desc(bookings.createdAt));

    return data;
  } catch (err: unknown) {
    console.error("Read All Bookings Error:", err);
    return [];
  }
}