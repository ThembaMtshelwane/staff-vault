import expressAsyncHandler from "express-async-handler";
import {
  staffEmailsSchema,
  adminSchema,
  loginSchema,
} from "../../schemas/authSchema.js";

export const validateRegisterAllUsers = expressAsyncHandler(
  async (req, res, next) => {
    const { staffEmails } = req.body;
    const result = staffEmailsSchema.parse(staffEmails);

    if (!result.success) {
      return next(result.error);
    }
    req.body = result.data;
    next();
  }
);

export const validateRegisterAdmin = expressAsyncHandler(
  async (req, res, next) => {
    const { email, firstName, lastName } = req.body;
    const result = adminSchema.safeParse({ email, firstName, lastName });

    if (!result.success) {
      return next(result.error);
    }
    req.body = result.data;
    next();
  }
);

export const validateLogin = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    return next(result.error);
  }
  req.body = result.data;
  next();
});
