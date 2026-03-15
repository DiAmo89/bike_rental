import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(50, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .min(8)
    .max(100, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
