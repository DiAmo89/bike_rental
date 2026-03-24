"use server";

import { db } from "@/db/db";
import { bookings } from "@/db/tables/bookings";
import { eq } from "drizzle-orm";

export async function getBookingById(id: string) {
  try {
    if (!id) return null;

    const [booking] = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, id))
      .limit(1);

    return booking || null;
  } catch (err: unknown) {
    console.error("Read Booking ID Error:", err);
    return null;
  }
}