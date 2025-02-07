import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel.js";
/**
 *  @description Register all organization's users
 *  @route POST /api/superAdmin/organizations
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

export { registerAllUsers };
