import express from "express";
import {
  addOrganization,
  getAllOrganizations,
  getOrganizationByAdmin,
  deleteOrganization,
  updateOrganizationByAdmin,
} from "../controllers/organizationControllers.js";

const router = express.Router();

router.route("/").post(addOrganization).get(getAllOrganizations);

router.route("/:id").delete(deleteOrganization);

router.get("/:admin", getOrganizationByAdmin);
router.put("/:id", updateOrganizationByAdmin);

export default router;
