import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";
/**
 *  @description Register all organization's users
 *  @route POST /api/users
 *  @access PRIVATE
 */
const registerAllUsers = expressAsyncHandler(async (req, res) => {
  const { staffEmails } = req.body;

  if (!staffEmails) {
    throw new Error("Please enter a list of staff emails");
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
    throw new Error("Failed to register all staff");
  }
  res.status(201).json({
    success: true,
    message: `Uploaded ${data.length} staff emails to the database`,
  });
});

const createAdminUser = expressAsyncHandler(async (req, res) => {
  const { email, firstName, lastName } = req.body;

  if (!email) {
    throw new Error("Please enter an email address for the admin");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error(`This email already exists within our database.`);
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
    res.status(500);
    throw new Error(`Failed to create admin`);
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
    res.status(400);
    throw new Error(`This email already exists within our database.`);
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
    res.status(401);
    throw new Error("Invalid email or password");
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
      res.status(400);
      throw new Error("Invalid department id");
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
    res.status(404).json({ success: false, message: "No users found" });
  }
});

const fetchAllUsersFilter = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});

  if (!users) {
    res.status(500);
    throw new Error("Internal Server error");
  }

  if (users.length > 0) {
    res.status(200).json({
      success: true,
      message: `Found ${users.length} users`,
      data: users,
    });
  } else {
    res.status(404).json({ success: false, message: "No users found" });
  }
});

const fetchUserById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Invalid id");
  }
  const user = await User.findById(id);

  if (user) {
    res.status(200).json({
      success: true,
      message: "Retrieved user",
      data: user,
    });
  } else {
    res.status(404);
    throw new Error("User not founded");
  }
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Invalid id");
  }
  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.email = req.body.email || user.email;
  user.password = req.body.password || user.password;
  user.position = req.body.position || user.position;
  user.department = req.body.department || user.department;
  user.supervisor = req.body.supervisor || user.supervisor;

  const updatedUser = await user.save();
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
    throw new Error("Invalid id");
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
    throw new Error("User not founded");
  }
});

const getUserProfile = expressAsyncHandler(async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, user not found" });
  }
  const user = {
    _id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    position: req.user.position,
    role: req.user.role,
    permissions: req.user.permissions,
    files: req.user.files || [],
    department: req.user.department,
    supervisor: req.user.supervisor,
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
