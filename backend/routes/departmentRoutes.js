import express from "express";
import {
  createAllDepartments,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  addDepartment,
  deleteDepartment,
  getDepartmentsFilter,
} from "../controllers/departmentController.js";
import { validateCreateAllDepartments } from "../middleware/validators/departmentValidator.js";

const router = express.Router();

router
  .route("/")
  .post(validateCreateAllDepartments, createAllDepartments)
  .get(getDepartments);
router.get("/filter", getDepartmentsFilter);
router.route("/add").post(addDepartment);
router
  .route("/:id")
  .get(getDepartmentById)
  .put(updateDepartment)
  .delete(deleteDepartment);

export default router;
