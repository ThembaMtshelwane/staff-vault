import asyncHandler from "express-async-handler";
import Organization from "../model/organizationModel.js";
import User from "../model/userModel.js";
import Department from "../model/departmentModel.js";

/**
 *  @description create an organization
 *  @route POST /api/superAdmin/organizations
 *  @access PRIVATE
 */

const addOrganization = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    staffEmails,
    departmentsInfo,
    registrationNumber,
    admin,
  } = req.body;

  if (
    !name ||
    !description ||
    !staffEmails ||
    !departmentsInfo ||
    !registrationNumber ||
    !admin
  ) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const organizationExists = await Organization.findOne({ registrationNumber });
  if (organizationExists) {
    res.status(400);
    throw new Error("Organization already exists.");
  }

  const users = await createUsers(staffEmails);
  const departments = await createDepartments(departmentsInfo);

  const org = await Organization.create({
    name,
    description,
    registrationNumber,
    departments,
    admin,
    users,
  });
  res.status(201).json({
    success: true,
    message: "Organization added",
    organization: org,
  });
});

/**
 *  @description retrieves all organizations
 *  @route GET /api/superAdmin/organizations
 *  @access PRIVATE
 */

const getAllOrganizations = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Retrieved all organizations", data: [] });
});

/**
 *  @description get an organization by id
 *  @route GET /api/superAdmin/organizations/:id
 *  @access PRIVATE
 */
const getOrganizationById = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Retrieved a single organization",
    data: {},
  });
});

/**
 *  @description delete an organization
 *  @route DELETE /api/superAdmin/organizations/:id
 *  @access PRIVATE
 */
const deleteOrganization = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Successfully deleted an organization" });
});

export {
  addOrganization,
  getAllOrganizations,
  getOrganizationById,
  deleteOrganization,
};

