import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { userRoleEnum } from "../enums";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }),
  phone: varchar("phone", { length: 30 }),
  role: userRoleEnum("role").notNull().default("CUSTOMER"),
  avatar: varchar("avatar", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
