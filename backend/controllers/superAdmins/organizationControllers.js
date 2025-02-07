import asyncHandler from "express-async-handler";
import Organization from "../../model/organizationModel.js";

/**
 *  @description create an organization
 *  @route POST /api/superAdmin/organizations
 *  @access PRIVATE
 */

const addOrganization = asyncHandler(async (req, res) => {
  const { name, description, registrationNumber } = req.body;

  if (!name || !description || !registrationNumber) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const organizationExists = await Organization.findOne({ registrationNumber });
  if (organizationExists) {
    res.status(400);
    throw new Error(`This organization already exists within our database.`);
  }

  const org = await Organization.create({
    name,
    description,
    registrationNumber,
  });
  res.status(201).json({
    success: true,
    message: `${name}'s basic information is added`,
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
