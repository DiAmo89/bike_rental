import { NextResponse } from "next/server";
import updateAccessory from "../update-accessory";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const formData = await req.formData();
  if (!id) {
    return NextResponse.json(
      { success: false, error: "Missing id" },
      { status: 400 },
    );
  }
  await updateAccessory(id, formData);
  return NextResponse.json({ success: true });
}
