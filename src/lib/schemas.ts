import { z } from "zod";

export const registerUserSchema = z.object({	
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(64, "Password must be 64 characters or less"),
	passwordConfirm: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(64, "Password must be 64 characters or less")
});

export const emailSchema = registerUserSchema.pick({ email: true });
export type EmailSchema = typeof emailSchema;

export const passwordSchema = registerUserSchema.pick({ password: true, passwordConfirm: true });
export type PasswordSchema = typeof passwordSchema;

const unixTimestampToISOString = z.number().transform((n) => new Date(n * 1000).toISOString());

