import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from "../constants/http.codes.js";
import HTTP_Error from "../utils/httpError.js";
import {
  addUserService,
  loginService,
  massStaffRegistrationService,
} from "../service/authService.js";
import { deleteOneDoc, updateOneDoc } from "../service/crudHandlerFactory.js";
/**
 *  @description Register all organization's users
 *  @route POST /api/users
 *  @access PRIVATE
 */
const registerAllUsers = expressAsyncHandler(async (req, res) => {
  const { staffEmails } = req.body;
  const { data, errors } = await massStaffRegistrationService(staffEmails);
  const message = errors.map((error) => `${error}\n`).join();
  res.status(201).json({
    success: true,
    message: `✔ Registered: ${data.length} staff members out of ${
      data.length + errors.length
    }.
⚠ Warning: ${errors.length} staff members already exist.
ℹ Details: ${message}`,
  });
});

const createAdminUser = expressAsyncHandler(async (req, res) => {
  const user = await addUserService({ ...req.body, role: "admin" });
  if (!user) {
    throw new HTTP_Error("Failed to create admin", INTERNAL_SERVER_ERROR);
  }
  res.status(201).json({
    success: true,
    message: `Successfully created an admin`,
    data: user,
  });
});

const addUser = expressAsyncHandler(async (req, res) => {
  const user = await addUserService(req.body);
  if (!user) {
    throw new HTTP_Error("User not created", INTERNAL_SERVER_ERROR);
  }
  res.status(201).json({
    success: true,
    message: `Successfully created a user`,
  });
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const user = await loginService(req.body);

  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      data: user,
    });
  } else {
    throw new HTTP_Error("Invalid email or password", UNAUTHORIZED);
  }
});

const logoutUser = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    success: true,
    message: "User logged out",
  });
});

const fetchAllUsers = expressAsyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const search = req.query.search || "";
  const department = req.query.department;
  const limit = 12;
  const skip = (page - 1) * limit;
  let filter = {};

  if (department) {
    if (!mongoose.Types.ObjectId.isValid(department)) {
      throw new HTTP_Error("Invalid department id", BAD_REQUEST);
    }
    filter.department = new mongoose.Types.ObjectId(department);
  }

  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { position: { $regex: search, $options: "i" } },
    ];
  }

  const users = await User.find(filter).skip(skip).limit(limit);
  const totalUsers = await User.countDocuments(filter);

  if (users.length > 0) {
    res.status(200).json({
      success: true,
      message: `Found ${users.length} users`,
      data: users,
      pagination: {
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        pageSize: limit,
      },
    });
  } else {
    throw new HTTP_Error("No users found", NOT_FOUND);
  }
});

const fetchAllUsersFilter = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});

  if (!users) {
    throw new HTTP_Error("Internal Server error", INTERNAL_SERVER_ERROR);
  }

  if (users.length > 0) {
    res.status(200).json({
      success: true,
      message: `Found ${users.length} users`,
      data: users,
    });
  } else {
    throw new HTTP_Error("No users found", NOT_FOUND);
  }
});

const fetchUserById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new HTTP_Error("Invalid id", BAD_REQUEST);
  }
  const user = await User.findById(id);

  if (user) {
    res.status(200).json({
      success: true,
      message: "Retrieved user",
      data: user,
    });
  } else {
    throw new HTTP_Error("User not founded", NOT_FOUND);
  }
});

const updateUser = updateOneDoc(User);

const deleteUser = deleteOneDoc(User);

const getUserProfile = expressAsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new HTTP_Error("Not authorized, user not found", UNAUTHORIZED);
  }
  const user = {
    _id: req.user._id.toString(),
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    position: req.user.position || "",
    role: req.user.role,
    permissions: req.user.permissions || [],
    department: req.user.department ? req.user.department.toString() : null,
    supervisor: req.user.supervisor ? req.user.supervisor.toString() : null,
  };

  res.status(200).json({
    success: true,
    message: "Logged in user data returned",
    data: user,
  });
});

export {
  registerAllUsers,
  createAdminUser,
  loginUser,
  fetchAllUsers,
  fetchAllUsersFilter,
  fetchUserById,
  deleteUser,
  updateUser,
  addUser,
  logoutUser,
  getUserProfile,
};
