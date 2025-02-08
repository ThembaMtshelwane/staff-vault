import express from "express";
import {
  createAdminUser,
  loginUser,
  registerAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerAllUsers);
router.post("/admin", createAdminUser);
router.post("/login", loginUser);

export default router;
