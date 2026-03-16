import { NextResponse } from "next/server";
import { bikesService } from "@/services/bikes.service";

export async function GET() {
  const data = await bikesService.getAllBikes();
  return NextResponse.json(data);
}