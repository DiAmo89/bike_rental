import { relations } from "drizzle-orm";
import { users } from "../tables/users";
import { bookings } from "../tables/bookings";

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));