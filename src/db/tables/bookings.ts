import {
  pgTable,
  uuid,
  date,
  timestamp,
  decimal,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { bikes } from "./bikes";

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  bikeId: uuid("bike_id")
    .notNull()
    .references(() => bikes.id, { onDelete: "restrict" }),

  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),

  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
