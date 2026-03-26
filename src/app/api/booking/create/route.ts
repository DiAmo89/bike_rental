import { db } from "@/db/db";
import { bookings } from "@/db/tables/bookings";
import { users } from "@/db/tables/users";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth-options";
import { bookingSchema } from "@/lib/schemas/auth-schema";
import { NextResponse } from "next/server";
import { bookingAccessories } from "@/db/tables/booking-accessories";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);

    if (!dbUser[0]) {
      return NextResponse.json(
        { error: "User not found in DB" },
        { status: 404 },
      );
    }

    const body = await req.json();

    const validation = bookingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid data",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { firstName, lastName, email, phone, startDate, endDate } =
      validation.data;
    const { bikeId, totalPrice, bookingAccessories: selectedIds } = body;

    const [newBooking] = await db
      .insert(bookings)
      .values({
        userId: dbUser[0].id,
        bikeId: bikeId,
        firstName,
        lastName,
        email,
        phone,
        startDate: startDate.split("T")[0],
        endDate: endDate.split("T")[0],
        totalPrice: totalPrice.toString(),
      })
      .returning();

    if (
      newBooking &&
      selectedIds &&
      Array.isArray(selectedIds) &&
      selectedIds.length > 0
    ) {
      const accessoryData = selectedIds.map((id: string) => ({
        bookingId: newBooking.id,
        accessoryId: id,
      }));

      await db.insert(bookingAccessories).values(accessoryData);
    }

    return NextResponse.json(
      { success: true, bookingId: newBooking.id },
      { status: 201 },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("SERVER_ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
