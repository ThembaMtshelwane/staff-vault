import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel.js";
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
  });
  res.status(201).json({
    success: true,
    message: `Successfully created an admin`,
    data: user,
  });
});

export { registerAllUsers, createAdminUser };
