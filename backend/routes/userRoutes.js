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
  fetchAllUsersFilter,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateRegisterAllUsers,
  validateRegisterAdmin,
  validateLogin,
} from "../middleware/validators/authValidator.js";
import { validateAddUser } from "../middleware/validators/userValidator.js";

const router = express.Router();

router
  .route("/")
  .post(protect, validateRegisterAllUsers, registerAllUsers)
  .get(protect, fetchAllUsers);
router.get("/filter", fetchAllUsersFilter);
router.post("/admin", validateRegisterAdmin, createAdminUser);
router.post("/login", validateLogin, loginUser);
router.post("/logout", logoutUser);
router.post("/add-user", protect, validateAddUser, addUser);
router.get("/profile", protect, getUserProfile);
router
  .route("/:id")
  .get(protect, fetchUserById)
  .delete(protect, deleteUser)
  .put(protect, updateUser);

export default router;
