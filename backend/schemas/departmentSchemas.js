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
