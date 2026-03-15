"use server";

import { db } from "@/db/db";
import { users } from "@/db/tables/users";
import bcrypt from "bcrypt";
import { registerSchema } from "@/lib/schemas/auth-schema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerUser(formData: any) {
  const validation = registerSchema.safeParse(formData);

  if (!validation.success) {
    return { error: "Invalid data format. Nice try!" };
  }

  const { name, email, password } = validation.data;

  try {
    const existingUser = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, email),
    });

    if (existingUser) {
      return {
        error: "A user with this email address already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      fullName: name,
      email: email,
      password: hashedPassword,
      role: "CUSTOMER",
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong while creating your account." };
  }
}
