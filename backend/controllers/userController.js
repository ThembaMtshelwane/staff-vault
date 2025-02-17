import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";
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
          password: "user_st@f5Va_ul7",
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
  const { email } = req.body;

  if (!email) {
    throw new Error("Please enter an email address for the admin");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error(`This email already exists within our database.`);
  }

  const user = await User.create({
    email,
    permissions: ["add_user", "suspend_user"],
    role: "admin",
    password: "admin_st@f5Va_ul7",
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
  const data = req.body;
  const { firstName, lastName, email, position } = data.data;

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
  const users = await User.find();
  if (users) {
    res.status(200).json({
      success: true,
      message: "Retrieved all users",
      data: users,
    });
  } else {
    res.status(500);
    throw new Error("Users not fetched");
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
  fetchUserById,
  deleteUser,
  updateUser,
  addUser,
  logoutUser,
  getUserProfile,
};
