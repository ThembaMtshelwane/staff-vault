import expressAsyncHandler from "express-async-handler";
import {
  addUserSchema,
  fetchUsersSchema,
  updateUserSchema,
  userIdSchema,
  userProfileSchema,
} from "../../schemas/userSchema.js";

export const validateAddUser = expressAsyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, position, department, password } =
    req.body;

  const result = addUserSchema.safeParse({
    firstName,
    lastName,
    email,
    position,
    department,
    password,
  });

  if (!result.success) {
    res.status(400);
    return next(result.error);
  }

  req.body = result.data;

  next();
});

export const validateFetchAllUsers = expressAsyncHandler(
  async (req, res, next) => {
    const parsedQuery = fetchUsersSchema.safeParse(req.query);

    if (!parsedQuery.success) {
      res.status(400);
      return next(parsedQuery.error);
    }

    req.query = parsedQuery.data;
    next();
  }
);

export const validateId = expressAsyncHandler(async (req, res, next) => {
  const parsedParams = userIdSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return next(parsedParams.error);
  }
  req.params = parsedParams.data;
  next();
});

export const validateUpdateUser = expressAsyncHandler(
  async (req, res, next) => {
    const result = updateUserSchema.safeParse(req.body);
    if (!result.success) next(result.error);

    req.body = result.data;
    next();
  }
);

export const validateGetUserProfile = expressAsyncHandler(
  async (req, res, next) => {
    const parsedUser = userProfileSchema.safeParse({
      ...req.user,
      _id: req.user._id.toString(),
    });

    if (!parsedUser.success) {
      res.status(400);
      return next(parsedUser.error);
    }

    next();
  }
);
