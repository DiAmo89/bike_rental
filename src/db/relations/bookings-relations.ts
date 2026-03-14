import { relations } from "drizzle-orm";
import { bookings } from "../tables/bookings";
import { users } from "../tables/users";
import { bikes } from "../tables/bikes";
import { bookingAccessories } from "../tables/booking-accessories";

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  bike: one(bikes, {
    fields: [bookings.bikeId],
    references: [bikes.id],
  }),
  bookingAccessories: many(bookingAccessories),
}));
