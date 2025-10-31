import { z } from "zod";

export const signInSchema = z
  .object({
    username: z.string().min(3, "Username must be 3 characters long"),
    password: z.string().min(6, "Password must be 6 characters long")
  });

export const signUpSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 character long"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be 6 characters long"),
    confirmPassword: z.string().min(6, "Password must be 6 characters long")
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type signInSchema = z.infer<typeof signInSchema>;
export type signUpSchema = z.infer<typeof signUpSchema>;

/*
.object for zod schema checks for object types
.min and .max for string types in zod schema checks for string length
.refine for password matching in zod schema checks for password matching
*/