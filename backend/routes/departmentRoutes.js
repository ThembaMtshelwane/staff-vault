import express from "express";
import {
  createAllDepartments,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  addDepartment,
  deleteDepartment,
  getFilteredDepartments,
} from "../controllers/departmentController.js";
import {
  validateCreateAllDepartments,
  validateFetchAllDepartments,
  validateDepartmentID,
  validateUpdateDepartment,
  validateAddDepartment,
} from "../middleware/validators/departmentValidator.js";

const router = express.Router();

router
  .route("/")
  .post(validateCreateAllDepartments, createAllDepartments)
  .get(validateFetchAllDepartments, getDepartments);
router.get("/filter", getFilteredDepartments);
router.post("/add", validateAddDepartment, addDepartment);
router
  .route("/:id")
  .get(validateDepartmentID, getDepartmentById)
  .put(validateDepartmentID, validateUpdateDepartment, updateDepartment)
  .delete(validateDepartmentID, deleteDepartment);

export default router;
