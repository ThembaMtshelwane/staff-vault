import expressAsyncHandler from "express-async-handler";
import { addUserSchema } from "../../schemas/userSchema.js";

export const validateAddUser = expressAsyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, position, department } =
    req.body

  const result = addUserSchema.safeParse({
    firstName,
    lastName,
    email,
    position,
    department,
  });

  if (!result.success) {
    res.status(400);
    throw new Error(result.error.message);
  }
  next();
});
