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

const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find({});
  if (departments) {
    res.status(200).json({
      success: true,
      message: `Found ${departments.length} departments`,
      data: departments,
    });
  } else {
    res.status(404);
    throw new Error("No departments found");
  }
});

const getDepartmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const department = await Department.findById(id);
  if (department) {
    res.status(200).json({
      success: true,
      message: `Found department ${department.name}`,
      data: department,
    });
  } else {
    res.status(404);
    throw new Error("Department not found");
  }
});

const updateDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const department = await Department.findById(id);
  const { name, email, staff } = req.body;

  if (department) {
    department.name = name || department.name;
    department.email = email || department.email;
    department.staff = staff || department.staff;

    const updatedDepartment = await department.save();
    res.status(200).json({
      success: true,
      message: `Department ${department.name} updated`,
      data: updatedDepartment,
    });
  } else {
    res.status(404);
    throw new Error("Department not found");
  }
});

const deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const department = await Department.findByIdAndDelete(id);
  if (department) {
    res.status(200).json({
      success: true,
      message: `${department.name} Department deleted`,
    });
  } else {
    res.status(404);
    throw new Error("Department not found");
  }
});

const addDepartment = asyncHandler(async (req, res) => {
  const { name, email, staff } = req.body;

  const departmentExists = await Department.findOne({ name });

  if (departmentExists) {
    res.status(400);
    throw new Error("Department already exists");
  }

  const department = await Department.create({
    name,
    email,
    staff,
  });
  if (department) {
    res.status(201).json({
      success: true,
      message: `${name} Department created successfully`,
      data: department,
    });
  } else {
    res.status(400);
    throw new Error("Department not created");
  }
});

export {
  createAllDepartments,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  addDepartment,
};
