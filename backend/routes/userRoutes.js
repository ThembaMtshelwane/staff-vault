import express from "express";
import {
  createAdminUser,
  registerAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerAllUsers);
router.post("/admin", createAdminUser);

export default router;
