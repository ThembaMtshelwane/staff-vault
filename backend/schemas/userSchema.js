import mongoose from "mongoose";
import { z } from "zod";

export const addUserSchema = z.object({
  firstName: z.string({ message: "Please enter first name" }),
  lastName: z.string({ message: "Please enter last name" }),
  email: z.string().email("Please enter email"),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long" }),
  position: z
    .string()
    .min(3, { message: "Position must be atleast 3 characters long" }),
  department: z
    .string()
    .nullable()
    .refine((val) => val === null || mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid supervisor ID",
    }),
  supervisor: z
    .string()
    .nullable()
    .refine((val) => val === null || mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid supervisor ID",
    }),
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
  _id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid user ID",
  }),
  firstName: z.string(),
  lastName: z.string(),
  position: z.string().optional(),
  department: z
    .string()
    .nullable()
    .refine((val) => val === null || mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid department ID",
    }),
  supervisor: z
    .string()
    .nullable()
    .refine((val) => val === null || mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid supervisor ID",
    }),
  email: z.string().min(1, "Please enter email").email("Please enter emails"),
  password: z.string(),
  role: z.string().min(1, "Please enter role"),
  permissions: z.array(z.string()).nonempty(),
});

export const updateUserSchema = z.object({
  firstName: z.string({ message: "Please enter first name" }).optional(),
  lastName: z.string({ message: "Please enter last name" }).optional(),
  email: z.string().email("Please enter email").optional(),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long" })
    .optional(),
  position: z
    .string()
    .min(3, { message: "Position must be atleast 3 characters long" })
    .optional(),
  department: z
    .string()
    .nullable()
    .refine((val) => val === null || mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid supervisor ID",
    })
    .optional(),
  supervisor: z
    .string()
    .nullable()
    .refine((val) => val === null || mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid supervisor ID",
    })
    .optional(),
});
