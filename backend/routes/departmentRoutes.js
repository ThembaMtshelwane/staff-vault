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
import {
  validateCreateAllDepartments,
  validateFetchAllDepartments,
  validateDepartmentID,
} from "../middleware/validators/departmentValidator.js";

const router = express.Router();

router
  .route("/")
  .post(validateCreateAllDepartments, createAllDepartments)
  .get(validateFetchAllDepartments, getDepartments);
router.get("/filter", getDepartmentsFilter);
router.route("/add").post(addDepartment);
router
  .route("/:id")
  .get(validateDepartmentID, getDepartmentById)
  .put(validateDepartmentID, updateDepartment)
  .delete(validateDepartmentID, deleteDepartment);

export default router;
