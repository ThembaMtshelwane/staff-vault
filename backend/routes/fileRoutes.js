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
import {
  deleteFileValidator,
  downloadValidator,
  uploadFileValidator,
} from "../middleware/validators/fileValidator.js";

dotenv.config();
const fileRoutes = express.Router();

// Upload endpoint
fileRoutes.post(
  "/upload",
  upload.single("file"),
  uploadFileValidator,
  uploadFile
);

// Get file endpoint
fileRoutes.get("/filter", getFilteredFiles);

// Download endpoint
fileRoutes.get("/download/:filename", downloadValidator, downloadFile);

//Delete file
fileRoutes.delete("/:filename/:documentType", deleteFileValidator, deleteFile);

// Get all files endpoint
fileRoutes.get("/", getAllFiles);

export default fileRoutes;
