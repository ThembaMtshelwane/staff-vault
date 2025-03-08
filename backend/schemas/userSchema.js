import mongoose from "mongoose";
import { z } from "zod";

export const addUserSchema = z.object({
  firstName: z.string().min(1, { message: "Please enter first name" }),
  lastName: z.string().min(1, { message: "Please enter last name" }),
  email: z.string().min(1, "Please enter email").email("Please enter emails"),
  position: z.string().optional(),
  department: z.string().optional(),
});

export const fetchUsersSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 1)),
  search: z.string().optional().default(""),
  department: z
    .string()
    .optional()
    .refine((val) => !val || mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid department ID",
    }),
});

export const userIdSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid user ID",
  }),
});

export const userProfileSchema = z.object({
  _id: userIdSchema,
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  position: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  permissions: z
    .array(z.string())
    .min(1, "At least one permission is required"),
  files: z.array(z.string()).default([]),
  department: z.union([userIdSchema, z.null()]).optional(),
  supervisor: z.union([userIdSchema, z.null()]).optional(),
});
