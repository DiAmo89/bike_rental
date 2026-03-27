import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  decimal,
} from "drizzle-orm/pg-core";
import { categories } from "./categories";

export const bikes = pgTable("bikes", {
  id: uuid("id").primaryKey().defaultRandom(),
  brand: varchar("brand", { length: 80 }),
  model: varchar("model", { length: 80 }),
  description: text("description"),
  pricePerDay: decimal("price_per_day", { precision: 10, scale: 2 }).notNull(),
  image: varchar("image", { length: 255 }),
  imageKey: varchar("image_key", { length: 255 }),
  isActive: boolean("is_active").notNull().default(true),
  bikeCategoryId: uuid("bike_category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "restrict" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Bike = typeof bikes.$inferSelect;
export type NewBike = typeof bikes.$inferInsert;
