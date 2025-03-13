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
/**
 *  @description Register all organization's users
 *  @route POST /api/users
 *  @access PRIVATE
 */
const registerAllUsers = expressAsyncHandler(async (req, res) => {
  const { staffEmails } = req.body;

  if (!staffEmails) {
    throw new HTTP_Error("Please enter a list of staff emails", BAD_REQUEST);
  }
  const data = await Promise.all(
    staffEmails.map(async (email) => {
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          email,
          permissions: ["modify_files", "modify_data"],
          password: process.env.USER_PASSWORD,
        });
      }
      return user;
    })
  );

  if (!data) {
    throw new HTTP_Error("Failed to register all staff", INTERNAL_SERVER_ERROR);
  }
  res.status(201).json({
    success: true,
    message: `Uploaded ${data.length} staff emails to the database`,
  });
});

const createAdminUser = expressAsyncHandler(async (req, res) => {
  const { email, firstName, lastName } = req.body;

  if (!email) {
    throw new HTTP_Error(
      "Please enter an email address for the admin",
      BAD_REQUEST
    );
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new HTTP_Error(
      "This email already exists within our database.",
      BAD_REQUEST
    );
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    permissions: ["add_user", "suspend_user"],
    role: "admin",
    password: process.env.ADMIN_PASSWORD,
  });
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
  const { firstName, lastName, email, position, department } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new HTTP_Error(
      `This email already exists within our database.`,
      BAD_REQUEST
    );
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    position,
    department,
  });

  if (user) {
    res.status(201).json({
      success: true,
      message: `Successfully created a user`,
    });
  } else {
    res.status(500);
    throw new Error("User not created");
  }
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
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

const updateUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new HTTP_Error("Invalid id", BAD_REQUEST);
  }
  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new HTTP_Error("User not found", NOT_FOUND);
  }
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.email = req.body.email || user.email;
  user.password = req.body.password || user.password;
  user.position = req.body.position || user.position;
  user.department = req.body.department || user.department;
  user.supervisor = req.body.supervisor || user.supervisor;

  const updatedUser = await user.save();

  if (!updateUser) {
    throw new HTTP_Error("Failed to update user.", INTERNAL_SERVER_ERROR);
  }

  res.status(200).json({
    success: true,
    message: `${
      updatedUser.firstName ? updatedUser.firstName : "User"
    } updated`,
    data: updatedUser,
  });
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new HTTP_Error("Invalid id", BAD_REQUEST);
  }

  const removedUser = await User.findByIdAndDelete(id);

  if (removedUser) {
    res.status(200).json({
      success: true,
      message: "User deleted",
      data: removedUser,
    });
  } else {
    res.status(404);
    throw new HTTP_Error("User not founded", NOT_FOUND);
  }
});

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
