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
