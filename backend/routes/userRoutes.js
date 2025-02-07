import express from "express";
import { registerAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerAllUsers);

export default router;
