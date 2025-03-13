import { ADMIN_PASSWORD, USER_PASSWORD } from "../constants/env.const.js";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from "../constants/http.codes.js";
import User from "../model/userModel.js";
import HTTP_Error from "../utils/httpError.js";

export const massStaffRegistrationService = async (staffEmails) => {
  if (!staffEmails || !Array.isArray(staffEmails) || staffEmails.length === 0) {
    throw new HTTP_Error(
      "Please enter a valid list of staff emails",
      BAD_REQUEST
    );
  }
  const errors = [];
  const data = [];
  await Promise.all(
    staffEmails.map(async (email) => {
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          email,
          permissions: ["modify_files", "modify_data"],
          password: USER_PASSWORD,
        });
        data.push(user);
        return user;
      } else {
        errors.push(`${email} already exists`);
      }
    })
  );

  if (errors.length === 0 && data.length === 0) {
    throw new HTTP_Error(
      `Failed to register all ${staffEmails.length} users`,
      INTERNAL_SERVER_ERROR
    );
  }
  if (errors.length > 0 && data.length === 0) {
    throw new HTTP_Error(
      `All ${errors.length} users already exist`,
      BAD_REQUEST
    );
  }

  return { data, errors };
};

export const addUserService = async (userData) => {
  const { firstName, lastName, email, position, department, role } = userData;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new HTTP_Error(
      `This email already exists within our database.`,
      BAD_REQUEST
    );
  }

  const user = {
    firstName: firstName || "Not Available",
    lastName: lastName || "Not Available",
    email,
  };

  if (role === "admin") {
    return await User.create({
      ...user,
      position: "admin",
      permissions: ["add_user", "suspend_user"],
      role: "admin",
      password: ADMIN_PASSWORD,
    });
  }

  return await User.create({
    ...user,
    position: position || "Not Available",
    department,
  });
};

export const loginService = async (userCredentials) => {
  const { email, password } = userCredentials;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) return user;
  else null;
};
