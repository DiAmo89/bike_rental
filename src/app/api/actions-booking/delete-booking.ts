"use server";

import { db } from "@/db/db";
import { bookings } from "@/db/tables/bookings";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteBooking(id: string) {
  try {
    if (!id) {
      throw new Error("Booking ID is required for deletion");
    }

   
    await db.delete(bookings).where(eq(bookings.id, id));

    
    revalidatePath("/admin/bookings");

    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to delete booking";
    console.error("Delete Booking Error:", errorMessage);
    throw new Error(errorMessage);
  }
}