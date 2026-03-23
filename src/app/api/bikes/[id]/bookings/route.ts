import { bikesService } from "@/services/bikes.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    
    const data = await bikesService.getBikeBookings(id);

   
    console.log(`[API] Bookings for bike ${id}:`, data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("[API ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" }, 
      { status: 500 }
    );
  }
}