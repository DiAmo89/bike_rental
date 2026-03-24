import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "./create-booking";
import { updateBooking } from "./update-booking";
import { deleteBooking } from "./delete-booking";
import { getAllBookings } from "./read-all-bookings";
import { getBookingById } from "./read-id-booking";
import { getBookingsByUserId } from "./read-user-id-bookings";


function handleError(err: unknown) {
  const message = err instanceof Error ? err.message : "An unknown error occurred";
  return NextResponse.json({ error: message }, { status: 500 });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");
    const mode = searchParams.get("mode");

    if (userId) {
      const data = await getBookingsByUserId(userId);
      return NextResponse.json(data);
    }

    if (id) {
      const data = await getBookingById(id);
      if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(data);
    }

    if (mode === "all") {
      const data = await getAllBookings();
      return NextResponse.json(data);
    }

    return NextResponse.json({ message: "Provide query params" }, { status: 400 });
  } catch (err) {
    return handleError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const result = await createBooking(formData);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return handleError(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const formData = await req.formData();
    const result = await updateBooking(id, formData);
    return NextResponse.json(result);
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const result = await deleteBooking(id);
    return NextResponse.json(result);
  } catch (err) {
    return handleError(err);
  }
}