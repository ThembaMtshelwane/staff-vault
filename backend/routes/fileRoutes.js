// Routes for file operations
import express from "express";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import {
  uploadFile,
  downloadFile,
  getAllFiles,
} from "../controllers/fileController.js";
import dotenv from "dotenv";

dotenv.config();
const fileRoutes = express.Router();

const url = process.env.MONGO_URI;

// Multer config for GridFS
const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: "fs", // Default bucket name
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

// Upload endpoint
fileRoutes.post("/upload", upload.single("file"), uploadFile);

// Download endpoint
fileRoutes.get("/:filename", downloadFile);

// Get all files endpoint
fileRoutes.get("/", getAllFiles);

export default fileRoutes;
