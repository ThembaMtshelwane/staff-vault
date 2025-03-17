// Controller for handling file operations
import File from "../model/fileUploadModel.js";
import expressAsyncHandler from "express-async-handler";
import path from "path";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http.codes.js";
import HTTP_Error from "../utils/httpError.js";
import {
  fetchDocs,
} from "../service/crudHandlerFactory.js";

/**
 * Uploads a file to GridFS and stores its metadata.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const uploadFile = expressAsyncHandler(async (req, res) => {
  if (!req.file) {
    throw new HTTP_Error("No file selected", BAD_REQUEST);
  }

  const relativePath = path.relative(process.cwd(), req.file.path);

  const newFile = new File({
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    path: relativePath,
    employee: req.body.employee,
    documentType: req.body.documentType,
  });

  const uploaded = await newFile.save();

  if (!uploaded) {
    throw new HTTP_Error("Failed to upload file", INTERNAL_SERVER_ERROR);
  }

  res.status(201).json({
    success: true,
    message: "File Uploaded Successfully",
    data: req.file,
  });
});

/**
 * Downloads a file from GridFS by its filename.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const downloadFile = expressAsyncHandler(async (req, res) => {
  const { filename } = req.params;
  const file = await File.findOne({ name: filename });

  if (!file) {
    throw new HTTP_Error("File not found", NOT_FOUND);
  }

  const fullPath = path.join(process.cwd(), file.path);
  res.download(fullPath, filename);
});

/**
 * Retrieves all files from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getAllFiles = fetchDocs(File);

export const getFilteredFiles = expressAsyncHandler(async (req, res) => {
  const documentType = req.query.documentType;

  const files = await File.find({ documentType }).exec();

  if (!files) {
    throw new HTTP_Error("HTTP_Error fetching file", INTERNAL_SERVER_ERROR);
  }
  res.status(200).json({
    success: true,
    message: `${documentType} files returned`,
    data: files,
  });
});

export const deleteFile = expressAsyncHandler(async (req, res) => {
  const { filename, documentType } = req.params;

  const fileExists = await File.findOne({
    name: filename,
    documentType,
  });

  if (!fileExists) {
    throw new HTTP_Error("No file found", NOT_FOUND);
  }

  const file = await File.findByIdAndDelete(fileExists._id);
  res.status(200).json({
    success: true,
    message: "File deleted successfully",
    data: file,
  });
});
