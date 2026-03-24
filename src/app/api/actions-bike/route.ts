import { NextRequest, NextResponse } from "next/server";
import { createBike } from "./create-bike";
import deleteBike from "./delete-bike";
import { getBikes } from "./read-all-bikes";
import { getBikeById } from "./read-id-bike";
import getBikesByCategory from "./read-category-bikes"; 
import updateBike from "./update-bike";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const categoryId = searchParams.get("categoryId");

    // by ID
    if (id) {
      const bike = await getBikeById(id);
      return bike ? NextResponse.json(bike) : NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // by CategoryId
    if (categoryId) {
      const bikes = await getBikesByCategory(categoryId);
      return NextResponse.json(bikes);
    }

    // getAll
    const allBikes = await getBikes();
    return NextResponse.json(allBikes);

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => formData.append(key, String(value)));
    await createBike(formData);
    return NextResponse.json({ message: "Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Create failed" }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    const body = await req.json();
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => formData.append(key, String(value)));
    await updateBike(id, formData);
    return NextResponse.json({ message: "Updated" });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    await deleteBike(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}