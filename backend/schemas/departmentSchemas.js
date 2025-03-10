import mongoose from "mongoose";
import { z } from "zod";

export const departmentSchema = z.object({
  name: z.string().min(1, "Department name is required"),
  positions: z.string().array().optional(),
  supervisor: z
    .string()
    .nullable()
    .refine((val) => val === null || mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid supervisor ID",
    }),
});

export const departmentsListSchema = z.array(departmentSchema);

export const departmentQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 1)),
  search: z.string().optional().default(""),
});

export const departmentIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid user ID",
  });

export const updateDepartmentSchema = z.object({
  id: departmentIdSchema,
  name: z.string().optional(),
  positions: z.string().array().optional().default([]),
  supervisor: z
    .string()
    .nullable()
    .refine((val) => val === null || mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid user ID",
    })
    .optional()
    .default(null),
});
