import File from "../model/fileUploadModel.js";
import path from "path";

export const fileUploadService = async (fileData, reqBody) => {
  const relativePath = path.relative(process.cwd(), fileData.path);
  const newFile = new File({
    name: fileData.originalname,
    mimetype: fileData.mimetype,
    path: relativePath,
    employee: reqBody.employee,
    documentType: reqBody.documentType,
  });
  const uploaded = await newFile.save();
  return uploaded;
};
