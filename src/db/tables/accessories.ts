import { pgTable, uuid, varchar, timestamp, decimal } from "drizzle-orm/pg-core";

export const accessories = pgTable("accessories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  pricePerDay: decimal("price_per_day", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Accessory = typeof accessories.$inferSelect;
export type NewAccessory = typeof accessories.$inferInsert;