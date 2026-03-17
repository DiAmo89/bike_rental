import { NextResponse } from "next/server";
import getAccessoryById from "../read-id-accessory";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  // Check for null id to avoid build errors and runtime bugs
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const accessory = await getAccessoryById(id);
  return NextResponse.json(accessory);
}
