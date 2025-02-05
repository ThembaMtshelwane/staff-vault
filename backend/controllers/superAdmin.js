import asyncHandler from "express-async-handler";

/**
 *  @description create an organization
 *  @route POST /api/superAdmin/organizations
 *  @access PRIVATE
 */

const addOrganization = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Organization added",
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
