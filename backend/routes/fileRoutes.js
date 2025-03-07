// Routes for file operations
import express from "express";
import {
  uploadFile,
  downloadFile,
  getAllFiles,
  getFilteredFiles,
  deleteFile,
} from "../controllers/fileController.js";
import dotenv from "dotenv";
import { upload } from "../config/db.js";

dotenv.config();
const fileRoutes = express.Router();

// Upload endpoint
fileRoutes.post("/upload", upload.single("file"), uploadFile);

// Get file endpoint
fileRoutes.get("/filter", getFilteredFiles);

// Download endpoint
fileRoutes.get("/:filename", downloadFile);

//Delete file
fileRoutes.delete("/:filename/:documentType", deleteFile);

// Get all files endpoint
fileRoutes.get("/", getAllFiles);

export default fileRoutes;
