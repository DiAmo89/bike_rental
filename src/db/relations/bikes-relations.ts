import { relations } from "drizzle-orm";
import { bikes } from "../tables/bikes";
import { categories } from "../tables/categories";
import { bookings } from "../tables/bookings";

export const bikesRelations = relations(bikes, ({ one, many }) => ({
  category: one(categories, {
    fields: [bikes.bikeCategoryId],
    references: [categories.id],
  }),
  bookings: many(bookings),
}));