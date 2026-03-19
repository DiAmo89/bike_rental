import { db } from "@/db/db";
import { bikes } from "@/db/tables/bikes";
import { categories } from "@/db/tables/categories";
import { eq } from "drizzle-orm";

export const bikesService = {
  async getAllBikes() {
    try {
      const result = await db
        .select({
          bike: bikes,
          category: categories,
        })
        .from(bikes)
        .leftJoin(categories, eq(bikes.bikeCategoryId, categories.id));

      return result.map(({ bike, category }) => ({
        ...bike,
        pricePerDay: Number(bike.pricePerDay),
        category: category
          ? { ...category }
          : {
              id: "",
              name: "No Category",
              description: null,
            },
      }));
    } catch (error) {
      console.error("Error loading bikes:", error);
      return [];
    }
  },

  async getAllCategories() {
    try {
      return await db.select().from(categories);
    } catch (error) {
      console.error("Error loading categories:", error);
      return [];
    }
  },

  async getBikeById(id: string) {
    const result = await db.select().from(bikes).where(eq(bikes.id, id));
    return result[0] || null;
  },
};
