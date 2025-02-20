import asyncHandler from "express-async-handler";
import Organization from "../model/organizationModel.js";

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
const getOrganizationByAdmin = asyncHandler(async (req, res) => {
  const { admin } = req.params;

  const organizationExists = await Organization.findOne({ admin });

  if (!organizationExists) {
    throw new Error("No organization found with this admin");
  }
  res.status(200).json({
    success: true,
    message: "Retrieved an organization",
    data: organizationExists,
  });
});

const updateOrganizationByAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const organization = await Organization.findById(id);

  if (!organization) {
    res.status(404);
    throw new Error("No organization found with this admin");
  }

  organization.name = req.body.name || organization.name;
  organization.email = req.body.email || organization.email;
  organization.address = req.body.address || organization.address;
  organization.description = req.body.description || organization.description;
  organization.phone = req.body.phone || organization.phone;

  const updatedOrganization = await organization.save();
  res.status(200).json({
    success: true,
    message: "Organization updated",
    data: updatedOrganization,
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
  getOrganizationByAdmin,
  updateOrganizationByAdmin,
  deleteOrganization,
};
