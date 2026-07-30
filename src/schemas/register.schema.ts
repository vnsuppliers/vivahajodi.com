import { z } from "zod";

// Regex to block any URL-like patterns (http, www, etc.)
const noUrls = /^(?!.*(http|https|www\.|\.com|\.net|\.org)).*$/i;

export const registerSchema = z.object({
  first_name: z.string().min(2, "First name is too short").regex(noUrls, "URLs are not allowed"),
  last_name: z.string().min(1, "Last name is required").regex(noUrls, "URLs are not allowed"),
  email: z.string().email("Invalid email address"),
  phone: z.string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^\d+$/, "Only numbers allowed"), // Strict numeric check
  password: z.string().min(8, "Password must be at least 8 characters"),
  
  gender_id: z.string().min(1, "Gender is required"),
  religion_id: z.string().min(1, "Religion is required"),
  country_id: z.string().min(1, "Country is required"),
  state_id: z.string().min(1, "State is required"),
  city_id: z.string().min(1, "City is required"),
  
  about: z.string().min(20, "Please write at least 20 characters").regex(noUrls, "URLs are not allowed"),
});

export type RegisterErrors = Partial<Record<keyof z.infer<typeof registerSchema>, string>>;