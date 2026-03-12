import { relations } from "drizzle-orm";
import { accessories } from "../tables/accessories";
import { bookingAccessories } from "../tables/booking-accessories";

export const accessoriesRelations = relations(accessories, ({ many }) => ({
  bookingAccessories: many(bookingAccessories),
}));
