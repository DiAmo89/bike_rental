import { NextResponse } from "next/server";
import deleteAccessory from "../delete-accessory";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { success: false, error: "Missing id" },
      { status: 400 },
    );
  }
  await deleteAccessory(id);
  return NextResponse.json({ success: true });
}
