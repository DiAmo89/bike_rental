import { NextResponse } from "next/server";
import getAccessories from "../read-all-accessories";

export async function GET() {
  try {
    const accessories = await getAccessories();
    return NextResponse.json(accessories);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || String(error) },
      { status: 500 }, //must be
    );
  }
}
