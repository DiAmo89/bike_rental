import { db } from "@/db/db";
import { bikes } from "@/db/tables/bikes";
import { categories } from "@/db/tables/categories";
import { bookings } from "@/db/tables/bookings"; 
import { eq, and, lte, gte, notInArray } from "drizzle-orm";

export const bikesService = {
  
  async getAllBikes(startDate?: string, endDate?: string, categoryName?: string) {
    try {
      
      let query = db
        .select({
          bike: bikes,
          category: categories,
        })
        .from(bikes)
        .leftJoin(categories, eq(bikes.bikeCategoryId, categories.id))
        .$dynamic(); 

     
      if (categoryName && categoryName !== "all") {
        query = query.where(eq(categories.name, categoryName));
      }

    
      if (startDate && endDate) {
        const occupiedBikes = await db
          .select({ id: bookings.bikeId })
          .from(bookings)
          .where(
            and(
              lte(bookings.startDate, endDate), 
              gte(bookings.endDate, startDate)  
            )
          );

        const occupiedIds = occupiedBikes
          .map((b) => b.id)
          .filter((id): id is string => id !== null);

      
        if (occupiedIds.length > 0) {
          query = query.where(notInArray(bikes.id, occupiedIds));
        }
      }

      const result = await query;

    
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
    try {
      const result = await db
        .select({
          bike: bikes,
          category: categories,
        })
        .from(bikes)
        .leftJoin(categories, eq(bikes.bikeCategoryId, categories.id))
        .where(eq(bikes.id, id));
      
      if (!result[0]) return null;

      const { bike, category } = result[0];

      return {
        ...bike,
        pricePerDay: Number(bike.pricePerDay),
        category: category 
          ? { ...category } 
          : { 
              id: "", 
              name: "No Category", 
              description: null 
            },
      };
    } catch (error) {
      console.error(`Error loading bike with id ${id}:`, error);
      return null;
    }
  },

  async getBikeBookings(bikeId: string) {
    try {
      const data = await db
        .select({
          startDate: bookings.startDate,
          endDate: bookings.endDate,
        })
        .from(bookings)
        .where(eq(bookings.bikeId, bikeId));

      return data;
    } catch (error) {
      console.error("Error in getBikeBookings:", error);
      return [];
    }
  },
};