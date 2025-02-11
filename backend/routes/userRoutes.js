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
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, registerAllUsers).get(protect, fetchAllUsers);
router.post("/admin", createAdminUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.post("/add-user", protect, addUser);
router.get("/profile", protect, getUserProfile);
router.route("/:id").get(protect, fetchUserById).delete(protect, deleteUser);

export default router;
