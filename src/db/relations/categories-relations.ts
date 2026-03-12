import { relations } from "drizzle-orm";
import { categories } from "../tables/categories";
import { bikes } from "../tables/bikes";

export const categoriesRelations = relations(categories, ({ many }) => ({
  bikes: many(bikes),
}));