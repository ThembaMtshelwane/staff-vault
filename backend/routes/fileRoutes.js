import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { uploadFile } from "../controllers/fileController.js";

const router = express.Router();

// Single file upload
router.post("/file", upload().single("file"), uploadFile);


export default router;
