import express from "express";
import {
  createAllDepartments,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  addDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

router.route("/").post(createAllDepartments).get(getDepartments);
router.route("/add").post(addDepartment);
router.route("/:id").get(getDepartmentById).put(updateDepartment);

export default router;
