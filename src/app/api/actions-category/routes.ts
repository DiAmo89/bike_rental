import { NextRequest, NextResponse } from "next/server";
import createCategory from "./create-category"; 
import deleteCategory from "./delete-category";
import getAllCategories from "./read-all-categories";
import getCategoryById from "./read-id-category";
import updateCategory from "./update-category";


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const category = await getCategoryById(id);
      return category ? NextResponse.json(category) : NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = await getAllCategories();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => formData.append(key, String(value)));
    
    await createCategory(formData);
    return NextResponse.json({ message: "Category created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Creation failed" }, { status: 400 });
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

    await updateCategory(id, formData);
    return NextResponse.json({ message: "Category updated" });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await deleteCategory(id);
    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}