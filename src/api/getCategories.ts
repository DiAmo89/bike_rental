import { getBikes } from "./getBikes";
import { Category } from "@/types/Category";
export async function getCategories(): Promise<Category[]> {
  try {
    const items = await getBikes();
    const names = Array.from(
      new Set(
        items.map((i: any) =>
          typeof i.category === "object" ? i.category.name : String(i.category),
        ),
      ),
    );
    return names.map((name: string, index: number) => {
      const file = name.toLowerCase().replace(/['\s]/g, "");
      return {
        id: index + 1,
        name: name,
        image: "/images/categories/" + file + ".jpg",
      };
    });
  } catch (e) {
    console.error(e);
    return [];
  }
}
