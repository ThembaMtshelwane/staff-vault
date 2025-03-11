import expressAsyncHandler from "express-async-handler";
import { uploadFileSchema } from "../../schemas/fileSchema.js";

export const uploadFileValidator = expressAsyncHandler(
  async (req, res, next) => {
    const result = uploadFileSchema.safeParse({
      file: req.file,
      employee: req.body.employee,
      documentType: req.body.documentType,
    });

    if (!result.success) {
      res.status(400);
      throw new Error(result.error.errors);
    }

    console.log('result  ', result)
    req.file = result.data.file;
    req.body = {
      employee: result.data.employee,
      documentType: result.data.documentType,
    };
    next();
  }
);
