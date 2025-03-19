import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";
import {
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from "../constants/http.codes.js";
import HTTP_Error from "../utils/httpError.js";
import {
  addUserService,
  loginService,
  massStaffRegistrationService,
} from "../service/authService.js";
import {
  deleteOneDoc,
  fetchDocs,
  fetchDocsByPagination,
  fetchOneDoc,
  updateOneDoc,
} from "../service/crudHandlerFactory.js";
/**
 *  @description Register all organization's users
 *  @route POST /api/users
 *  @access PRIVATE
 */
const registerAllUsers = expressAsyncHandler(async (req, res) => {
  const { staffEmails } = req.body;
  const { data, message } = await massStaffRegistrationService(staffEmails);

  if (data) {
    res.status(201).json({
      success: true,
      message,
    });
  } else {
    throw new HTTP_Error("Failed to create all users", INTERNAL_SERVER_ERROR);
  }
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
    throw new HTTP_Error("Failed to create user", INTERNAL_SERVER_ERROR);
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

const fetchFilteredUsers = fetchDocsByPagination(User);

const fetchAllUsers = fetchDocs(User);

const fetchUserById = fetchOneDoc(User);

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
  fetchFilteredUsers,
  fetchUserById,
  deleteUser,
  updateUser,
  addUser,
  logoutUser,
  getUserProfile,
};
