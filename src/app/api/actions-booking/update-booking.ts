"use server";

import { db } from "@/db/db";
import { bookings } from "@/db/tables/bookings";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateBooking(id: string, formData: FormData) {
  try {
   
    const startDate = formData.get("startDate")?.toString();
    const endDate = formData.get("endDate")?.toString();
    const totalPrice = formData.get("totalPrice")?.toString();
    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();

    
    if (!id) {
      throw new Error("Booking ID is required for update");
    }


    await db
      .update(bookings)
      .set({
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(totalPrice && { totalPrice }),
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(email && { email }),
        ...(phone && { phone }),
      })
      .where(eq(bookings.id, id));

    
    revalidatePath("/admin/bookings");
    
    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to update booking";
    console.error("Update Booking Error:", errorMessage);
    throw new Error(errorMessage);
  }
}