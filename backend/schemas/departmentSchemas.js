import { z } from "zod";
import {
  departmentNameSchema,
  departmentPositions,
  fetchContentByFilters,
  objectIdSchema,
} from "./genericSchema.js";

export const departmentSchema = z.object({
  name: z.string().min(1, "Department name is required"),
  positions: z.string().array().optional(),
});

export const departmentsListSchema = z.array(departmentSchema);

export const departmentQuerySchema = fetchContentByFilters;

export const departmentIdSchema = objectIdSchema;

export const updateDepartmentSchema = z.object({
  id: objectIdSchema,
  name: departmentNameSchema.optional(),
  positions: departmentPositions,
  supervisor: objectIdSchema.default(null),
});

export const addDepartmentSchema = z.object({
  name: departmentNameSchema,
  supervisor: objectIdSchema,
  positions: departmentPositions,
});
