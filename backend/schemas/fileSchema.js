import mongoose from "mongoose";
import { z } from "zod";

const fileSchema = z
  .object({
    originalname: z.string().min(1, "File name is required"),
    path: z.string().min(1, "File path is required"),
    mimetype: z.string().refine((val) => val === "application/pdf", {
      message: "Only PDFs are allowed",
    }),
    size: z.number().max(16 * 1024 * 1024, "File size must be under 16MB"),
  })
  .refine((file) => file.size > 0, {
    message: "File is empty",
  });

export const uploadFileSchema = z.object({
  file: fileSchema,
  employee: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid Employee ID",
  }),
  documentType: z.string().min(1, "Document type is required"),
});

export const fileParamsSchema = z
  .string()
  .min(1, { message: "Must have a file name" });

export const deleteFileSchema = z.object({
  filename: fileParamsSchema,
  documentType: z.string().min(1, { message: "Must have a document type" }),
});
