import express from "express";
import {
  createAdminUser,
  fetchAllUsers,
  loginUser,
  registerAllUsers,
  fetchUserById,
  deleteUser,
  addUser,
  logoutUser,
  getUserProfile,
  updateUser,
  fetchFilteredUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateRegisterAllUsers,
  validateRegisterAdmin,
  validateLogin,
} from "../middleware/validators/authValidator.js";
import {
  validateAddUser,
  validateGetUserProfile,
  validateId,
  validateUpdateUser,
} from "../middleware/validators/userValidator.js";

const router = express.Router();

router
  .route("/")
  .post(protect, validateRegisterAllUsers, registerAllUsers)
  .get(protect, fetchAllUsers);
router.get("/filter", protect, fetchFilteredUsers);
router.post("/admin", protect, validateRegisterAdmin, createAdminUser);
router.post("/login", validateLogin, loginUser);
router.post("/logout", protect, logoutUser);
router.post("/add-user", protect, validateAddUser, addUser);
router.get("/profile", protect, getUserProfile);
router
  .route("/:id", protect)
  .get(validateId, fetchUserById)
  .delete(validateId, deleteUser)
  .put(validateId, validateUpdateUser, updateUser);

export default router;
