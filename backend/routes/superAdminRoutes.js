import express from "express";
import {
  addOrganization,
  getAllOrganizations,
  getOrganizationById,
  deleteOrganization
} from "../controllers/superAdmin.js";
const router = express.Router();

router.route("/organizations").post(addOrganization).get(getAllOrganizations);

router
  .route("/organizations/:id")
  .get(getOrganizationById)
  .delete(deleteOrganization);

export default router
