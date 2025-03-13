import expressAsyncHandler from "express-async-handler";
import {
  deleteFileSchema,
  fileParamsSchema,
  uploadFileSchema,
} from "../../schemas/fileSchema.js";

export const uploadFileValidator = expressAsyncHandler(
  async (req, res, next) => {
    const result = uploadFileSchema.safeParse({
      file: req.file,
      employee: req.body.employee,
      documentType: req.body.documentType,
    });

    if (!result.success) {
      res.status(400);
      return next(result.error);
    }

    console.log("result  ", result);
    req.file = result.data.file;
    req.body = {
      employee: result.data.employee,
      documentType: result.data.documentType,
    };
    next();
  }
);

export const downloadValidator = expressAsyncHandler(async (req, res, next) => {
  const result = fileParamsSchema.safeParse(req.params.filename);
  if (!result.success) {
    return next(result.error);
  }
  req.params.filename = result.data;
  next();
});

export const deleteFileValidator = expressAsyncHandler(
  async (req, res, next) => {
    const { filename, documentType } = req.params;
    const result = deleteFileSchema.safeParse({ filename, documentType });
    if (!result.success) {
      return next(result.error);
    }
    console.log("result data ", result.data);

    req.params = result.data;
    next();
  }
);
