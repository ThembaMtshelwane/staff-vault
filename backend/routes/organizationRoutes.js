import express from "express";
import {
  addOrganization,
  getAllOrganizations,
  getOrganizationById,
  deleteOrganization,
} from "../controllers/organizationControllers.js";

const router = express.Router();

router.route("/").post(addOrganization).get(getAllOrganizations);

router.route("/:id").get(getOrganizationById).delete(deleteOrganization);

export default router;
