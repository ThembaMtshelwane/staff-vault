import { z } from "zod";

const staffEmailsSchema = z
  .string()
  .email({ message: "Please enter emails" })
  .array()
  .nonempty({ message: "Please enter a list of staff emails" });

const adminSchema = z.object({
  firstName: z.string().min(1, "Please enter first name"),
  lastName: z.string().min(1, "Please enter last name"),
  email: z.string().min(1, "Please enter email").email("Please enter email"),
});

const loginSchema = z.object({
  email: z.string().min(1, "Please enter email").email("Please enter email"),
  password: z.string().min(1),
});
export { staffEmailsSchema, adminSchema, loginSchema };
