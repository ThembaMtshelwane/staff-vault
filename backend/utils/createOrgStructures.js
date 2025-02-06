import Department from "../model/departmentModel.js";
import User from "../model/userModel.js";

/**
 *  @description create a user profiles by default.
 *               Use an array of strings to store
 *               staff email.
 *               Use that array as the input
 *               Output is an array with object elements,
 *               { email and user _id}
 * ['email1@email.com']=>[{_id:'1234',email : 'email1@email.com'}]
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
 *  @description create a departments by default.
 *               Use an array of objects to store
 *               department's details (email and name).
 * [{name:dept1, email: 'email1@email.com'}]=>[{_id:123, name:dept1, email: 'email1@email.com'}]
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
