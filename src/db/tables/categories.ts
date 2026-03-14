import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  image: varchar("image", { length: 255 }),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;