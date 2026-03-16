import { db } from "@/db/db";
import { bikes } from "@/db/tables/bikes";
import { categories } from "@/db/tables/categories"; // Импорт таблицы категорий
import { eq } from "drizzle-orm";

export const bikesService = {
  async getAllBikes() {
    try {
      // Соединяем таблицу велосипедов с таблицей категорий по ID
      const result = await db
        .select({
          bike: bikes,
          category: categories,
        })
        .from(bikes)
        .leftJoin(categories, eq(bikes.bikeCategoryId, categories.id));

      // Маппим результат в удобный для фронтенда формат
      return result.map(({ bike, category }) => ({
        ...bike,
        title: `${bike.brand} ${bike.model}`,
        price: Number(bike.pricePerDay),
        status: bike.isActive ? "available" : "busy",
        // Теперь здесь реальное название из базы, а не заглушка!
        category: { 
          name: category?.name || "Без категории" 
        }
      }));
    } catch (error) {
      console.error("Ошибка при получении велосипедов:", error);
      return [];
    }
  },

  async getAllCategories() {
    try {
      return await db.select().from(categories);
    } catch (error) {
      console.error("Ошибка при получении категорий:", error);
      return [];
    }
  },

  async getBikeById(id: string) {
    const result = await db.select().from(bikes).where(eq(bikes.id, id));
    return result[0] || null;
  }
};