import express from "express";
import {
  createAdminUser,
  fetchAllUsers,
  loginUser,
  registerAllUsers,
  fetchUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerAllUsers).get(fetchAllUsers);
router.post("/admin", createAdminUser);
router.post("/login", loginUser);
router.get("/:id", fetchUserById);

export default router;
