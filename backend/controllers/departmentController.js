import asyncHandler from "express-async-handler";
import Department from "../model/departmentModel.js";

/**
 *  @description Create all of the organization's department
 *  @route POST /api/departments
 *  @access PRIVATE
 */
const createAllDepartments = asyncHandler(async (req, res) => {
  const { departmentsList } = req.body;

  if (!departmentsList) throw new Error("Please enter a list of departments");

  const data = await Promise.all(
    departmentsList.map(async (departmentInfo) => {
      const { name, email } = departmentInfo;
      let department = await Department.findOne({ name });
      if (!department) {
        department = await Department.create({
          name,
          email,
          staff: [],
        });
      }
      return department;
    })
  );
  if (data) {
    res.status(201).json({
      success: true,
      message: `Uploaded ${data.length} departments to the database`,
      data,
    });
  }
});

export { createAllDepartments };
