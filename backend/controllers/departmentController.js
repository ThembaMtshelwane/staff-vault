import asyncHandler from "express-async-handler";
import Department from "../model/departmentModel.js";
import mongoose from "mongoose";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http.codes.js";

/**
 *  @description Create all of the organization's department
 *  @route POST /api/departments
 *  @access PRIVATE
 */
const createAllDepartments = asyncHandler(async (req, res) => {
  const { departmentsList } = req.body;

  if (!departmentsList) {
    throw new HTTP_Error("Please enter a list of departments", BAD_REQUEST);
  }

  const data = await Promise.all(
    departmentsList.map(async (departmentInfo) => {
      const { name, positions } = departmentInfo;

      if (!name || !positions) {
        throw new HTTP_Error(
          "Each department must have both a name and positions",
          BAD_REQUEST
        );
      }

      let department = await Department.findOne({ name });
      if (!department) {
        department = await Department.create({
          name,
          positions,
        });
      } else {
        throw new HTTP_Error(`Department ${name} already exisits`, BAD_REQUEST);
      }
      return department;
    })
  );
  if (data) {
    res.status(201).json({
      success: true,
      message: `Uploaded ${data.length} departments to the database`,
    });
  } else {
    throw new HTTP_Error(
      "Failed to creat all departments",
      INTERNAL_SERVER_ERROR
    );
  }
});

const getDepartments = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const search = req.query.search;
  const limit = 12;
  const skip = (page - 1) * limit;
  let filter = {};

  const totalDepartments = await Department.countDocuments();

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      mongoose.Types.ObjectId.isValid(search) ? { supervisor: search } : null,
    ].filter(Boolean);
  }

  const departments = await Department.find(filter).skip(skip).limit(limit);

  if (departments.length > 0) {
    res.status(200).json({
      success: true,
      message: `Found ${departments.length} departments`,
      data: departments,
      pagination: {
        totalDepartments,
        currentPage: page,
        totalPages: Math.ceil(totalDepartments / limit),
        pageSize: limit,
      },
    });
  } else {
    throw new HTTP_Error("Departments not found", INTERNAL_SERVER_ERROR);
  }
});

const getDepartmentsFilter = asyncHandler(async (req, res) => {
  const departments = await Department.find({});

  if (departments.length > 0) {
    res.status(200).json({
      success: true,
      message: `Fetched all ${departments.length} departments`,
      data: departments,
    });
  } else {
    throw new HTTP_Error("Departments not found");
  }
});

const getDepartmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new HTTP_Error("Invalid id", BAD_REQUEST);
  }

  const department = await Department.findById(id);
  if (department) {
    res.status(200).json({
      success: true,
      message: `Found department ${department.name}`,
      data: department,
    });
  } else {
    throw (new HTTP_Error("Department not found"), NOT_FOUND);
  }
});

const updateDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new HTTP_Error("Invalid id", BAD_REQUEST);
  }
  const department = await Department.findById(id);
  const { name, positions, supervisor } = req.body;

  if (department) {
    department.name = name || department.name;
    department.positions = positions || department.positions;
    department.supervisor = supervisor || department.supervisor;

    const updatedDepartment = await department.save();
    res.status(200).json({
      success: true,
      message: `Department ${department.name} updated`,
      data: updatedDepartment,
    });
  } else {
    throw new HTTP_Error("Department not found", NOT_FOUND);
  }
});

const deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new HTTP_Error("Invalid id", BAD_REQUEST);
  }
  const department = await Department.findByIdAndDelete(id);
  if (department) {
    res.status(200).json({
      success: true,
      message: `${department.name} Department deleted`,
    });
  } else {
    throw (new HTTP_Error("Department not found"), NOT_FOUND);
  }
});

const addDepartment = asyncHandler(async (req, res) => {
  const { name, supervisor, positions } = req.body;

  if (!name || !supervisor || !positions) {
    throw new HTTP_Error(
      "Department must have an email, a supervisor, and positions",
      BAD_REQUEST
    );
  }

  const departmentExists = await Department.findOne({ name });

  if (departmentExists) {
    throw new HTTP_Error("Department already exists", BAD_REQUEST);
  }

  const department = await Department.create({
    name,
    supervisor,
    positions,
  });
  if (department) {
    res.status(201).json({
      success: true,
      message: `${name} Department created successfully`,
    });
  } else {
    throw new HTTP_Error("Department not created", INTERNAL_SERVER_ERROR);
  }
});

export {
  createAllDepartments,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  addDepartment,
  getDepartmentsFilter,
};
