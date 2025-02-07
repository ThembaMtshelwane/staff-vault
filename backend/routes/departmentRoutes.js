import express from "express";
import { createAllDepartments } from "../controllers/departmentController.js";

const router = express.Router();

router.post("/", createAllDepartments);

export default router;
