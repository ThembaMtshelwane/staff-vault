import { ADMIN_PASSWORD, USER_PASSWORD } from "../constants/env.const.js";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http.codes.js";
import User from "../model/userModel.js";
import HTTP_Error from "../utils/httpError.js";
import { removeDuplicates } from "../utils/utils.js";

export const massStaffRegistrationService = async (input) => {
  const { uniqueStrings: staffEmails, duplicates } = removeDuplicates(input);
  const errors = [];
  const data = [];
  let errorMessage = duplicates === 0 ? "" : `${duplicates} Duplicates removed`;

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
  errorMessage =
    errors.map((error) => `${error}\n`).join() + " and " + errorMessage;

  const message = `✔ Registered: ${data.length} department out of the ${
    input.length
  } given. ${
    errors.length
      ? ` ⚠ Warning: ${errors.length} departments already exist.
    ℹ Details: ${errorMessage}`
      : ""
  }
   `;

  return { data, message, errors };
};

export const addUserService = async (userData) => {
  const { firstName, lastName, email, position, department, role, supervisor } =
    userData;
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
    password: USER_PASSWORD,
    supervisor,
  });
};

export const loginService = async (userCredentials) => {
  const { email, password } = userCredentials;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) return user;
  else return null;
};
