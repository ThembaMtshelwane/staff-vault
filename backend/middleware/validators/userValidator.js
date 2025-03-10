import expressAsyncHandler from "express-async-handler";
import {
  addUserSchema,
  userIdSchema,
  userProfileSchema,
} from "../../schemas/userSchema.js";

export const validateAddUser = expressAsyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, position, department } = req.body;

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

  req.body = result.data;

  next();
});

export const validateFetchAllUsers = expressAsyncHandler(
  async (req, res, next) => {
    const parsedQuery = fetchUsersSchema.safeParse(req.query);

    if (!parsedQuery.success) {
      res.status(400);
      throw new Error(parsedQuery.error.message);
    }

    req.query = parsedQuery.data;
    next();
  }
);

export const validateId = expressAsyncHandler(async (req, res, next) => {
  const parsedParams = userIdSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      errors: parsedParams.error.format(),
    });
  }
  req.params = parsedParams.data;
  next();
});

export const validateGetUserProfile = expressAsyncHandler(async (req, res, next) => {
    const parsedUser = userProfileSchema.safeParse({
      ...req.user,
      _id: req.user._id.toString(), 
    });
  
    if (!parsedUser.success) {
      res.status(400);
      throw new Error(JSON.stringify(parsedUser.error.format(), null, 2));
    }
  
    next();
  });
