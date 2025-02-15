import { z } from "zod";

export const usernameSchema = z
 .string()
 .min(3, "Minimum 3 characters")
 .max(20, "Maximum 20 characters")
 .regex(/^[a-zA-Z0-9]*$/, "English letters and numbers only");

export const passwordSchema = z
 .string()
 .min(6, "Minimum 6 characters")
 .max(32, "Maximum 32 characters") 
 .refine((value) => !/\s/.test(value), "Spaces are not allowed");

export const loginFormSchema = z.object({
 username: usernameSchema,
 password: passwordSchema,
});