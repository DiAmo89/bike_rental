"use server";

import { db } from "@/db/db";
import { bookings } from "@/db/tables/bookings";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: FormData) {
  try {
    const userId = formData.get("userId")?.toString() || "";
    const bikeId = formData.get("bikeId")?.toString() || "";
    const firstName = formData.get("firstName")?.toString() || "";
    const lastName = formData.get("lastName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const startDate = formData.get("startDate")?.toString() || "";
    const endDate = formData.get("endDate")?.toString() || "";
    const totalPrice = formData.get("totalPrice")?.toString() || "";

    if (
      !userId ||
      !bikeId ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !startDate ||
      !endDate ||
      !totalPrice
    ) {
      throw new Error("Missing required fields");
    }

    await db.insert(bookings).values({
      userId: userId,
      bikeId: bikeId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      startDate: startDate,
      endDate: endDate,
      totalPrice: totalPrice,
    });

    revalidatePath("/admin");
    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to create booking";
    console.error("Create Booking Error:", errorMessage);
    throw new Error(errorMessage);
  }
}
