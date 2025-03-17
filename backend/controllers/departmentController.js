import asyncHandler from "express-async-handler";
import Department from "../model/departmentModel.js";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http.codes.js";
import {
  deleteOneDoc,
  fetchDocs,
  fetchDocsByPagination,
  fetchOneDoc,
  updateOneDoc,
} from "../service/crudHandlerFactory.js";

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

const getFilteredDepartments = fetchDocsByPagination(Department);

const getDepartments = fetchDocs(Department);

const getDepartmentById = fetchOneDoc(Department);

const updateDepartment = updateOneDoc(Department);

const deleteDepartment = deleteOneDoc(Department);

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
  getFilteredDepartments,
};
