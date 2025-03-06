// Controller for handling file operations
import mongoose from "mongoose";
import File from "../model/fileUploadModel.js";
import expressAsyncHandler from "express-async-handler";
import path from "path";

/**
 * Uploads a file to GridFS and stores its metadata.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const uploadFile = expressAsyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  const fileExists = await File.findOne({ name: req.file.originalname });

  if (fileExists) {
    await File.findByIdAndDelete(fileExists._id);
  }

  const relativePath = path.relative(process.cwd(), req.file.path);

  const newFile = new File({
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    path: relativePath,
    employee: req.body.employee,
    documentType: req.body.documentType,
  });

  await newFile.save();

  res.status(201).json({
    success: true,
    message: fileExists
      ? "File Replaced Successfully "
      : "File Uploaded Successfully",
    data: req.file,
  });
});

/**
 * Downloads a file from GridFS by its filename.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const downloadFile = expressAsyncHandler(async (req, res) => {
  const filename = req.params.filename;

  const file = await File.findOne({ name: filename });

  if (!file) {
    throw new Error("File not found");
  }
  const fullPath = path.join(process.cwd(), file.path);
  res.download(fullPath, filename);
});

/**
 * Retrieves all files from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getAllFiles = expressAsyncHandler(async (req, res) => {
  try {
    const files = await File.find().exec();

    res.status(200).json({
      results: files.length,
      data: files,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching files" });
  }
});

export const getFilteredFiles = expressAsyncHandler(async (req, res) => {
  const documentType = req.query.documentType;

  const files = await File.find({ documentType }).exec();

  if (!files) {
    res.status(500);
    throw new Error("Error fetching file");
  }
  res.status(200).json({
    success: true,
    message: `${documentType} files returned`,
    data: files,
  });
});
