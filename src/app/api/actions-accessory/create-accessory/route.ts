import { NextResponse } from "next/server";
import createAccessory from "../create-accessory";

export async function POST(req: Request) {
  const formData = await req.formData();
  await createAccessory(formData);
  return NextResponse.json({ success: true });
}
