import { relations } from "drizzle-orm";
import { bookingAccessories } from "../tables/booking-accessories";
import { bookings } from "../tables/bookings";
import { accessories } from "../tables/accessories";

export const bookingAccessoriesRelations = relations(
  bookingAccessories,
  ({ one }) => ({
    booking: one(bookings, {
      fields: [bookingAccessories.bookingId],
      references: [bookings.id],
    }),
    accessory: one(accessories, {
      fields: [bookingAccessories.accessoryId],
      references: [accessories.id],
    }),
  }),
);
