// Routes for file operations
import express from "express";
import {
  uploadFile,
  downloadFile,
  getAllFiles,
} from "../controllers/fileController.js";
import dotenv from "dotenv";
import { upload } from "../config/db.js";

dotenv.config();
const fileRoutes = express.Router();

// Upload endpoint
fileRoutes.post("/upload", upload.single("file"), uploadFile);

// Download endpoint
fileRoutes.get("/:filename", downloadFile);

// Get all files endpoint
fileRoutes.get("/", getAllFiles);

export default fileRoutes;
