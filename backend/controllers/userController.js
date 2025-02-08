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

  if (data) {
    res.status(201).json({
      success: true,
      message: `Uploaded ${data.length} staff emails to the database`,
      data,
    });
  }
});

const createAdminUser = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  console.log(email);

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
  res.status(201).json({
    success: true,
    message: `Successfully created an admin`,
    data: user,
  });
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

export { registerAllUsers, createAdminUser, loginUser };
