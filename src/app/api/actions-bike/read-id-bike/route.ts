import { NextResponse } from "next/server";
import { getBikeById } from "../read-id-bike";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const bike = await getBikeById(id);
  return NextResponse.json(bike);
}
