import Department from "../model/departmentModel.js";
import User from "../model/userModel.js";

/**
 *  @description Create user profiles by default.
 *               Takes an array of email strings.
 *               Returns an array of user objects with _id and email.
 * @param {Array<string>} staffEmails
 * @returns {Promise<Array<{_id: string, email: string}>>}
 */

export const createUsers = async (staffEmails) => {
  return (staffEmails = await Promise.all(
    staffEmails.map(async (email) => {
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({ email });
      }
      return user;
    })
  ));
};

/**
 *  @description Create departments by default.
 *               Takes an array of objects containing department name and email.
 *               Returns an array of created department objects.
 * @param {Array<{name: string, email: string}>} departmentsInfo
 * @returns {Promise<Array<{_id: string, name: string, email: string}>>}
 */
export const createDepartments = async (departmentsInfo) => {
  return (departmentsInfo = await Promise.all(
    departmentsInfo.map(async (departmentInfo) => {
      const { name, email } = departmentInfo;
      let department = await Department.findOne({ name });
      if (!department) {
        department = await Department.create({
          name,
          email,
          staff,
        });
      }
      return department;
    })
  ));
};
