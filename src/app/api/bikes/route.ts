import { bikesService } from "@/services/bikes.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    
    const start = searchParams.get("start") || undefined;
    const end = searchParams.get("end") || undefined;

   
    const data = await bikesService.getAllBikes(start, end);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch bikes" }, { status: 500 });
  }
}