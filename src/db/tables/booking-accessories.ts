import { pgTable, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { bookings } from "./bookings";
import { accessories } from "./accessories";

export const bookingAccessories = pgTable(
  "booking_accessories",
  {
    bookingId: uuid("booking_id")
      .notNull()
      .references(() => bookings.id, { onDelete: "cascade" }),
    accessoryId: uuid("accessory_id")
      .notNull()
      .references(() => accessories.id, { onDelete: "restrict" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.bookingId, t.accessoryId] })]
);

export type BookingAccessory = typeof bookingAccessories.$inferSelect;