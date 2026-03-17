import z from "zod";

export const updateProfileSchema = z.object({
  avatar: z.string().trim().optional(),
  full_name: z
    .string()
    .min(2, "Name must have minimum 2 symbols")
    .max(120, "Name is too long"),
  telephone: z
  .string()
  .trim()
  .refine(
    (value) => {
      if (!value) return true; 
      const phoneRegex = /^[+]?[0-9\s\-()\/]{7,20}$/;
      return phoneRegex.test(value);
    },
    {
      message: "Please enter a valid phone number",
    }
  ),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export type UpdateProfileFieldErrors = z.inferFlattenedErrors<
  typeof updateProfileSchema
>["fieldErrors"];
