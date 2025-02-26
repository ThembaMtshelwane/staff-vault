import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();

export const upload = () => {
  if (!process.env.MONGO_URI) {
    console.error("Error: No mongo connection string provided");
    throw new Error("No mongo connection string provided");
  }
  const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "filesBucket",
        };
        resolve(fileInfo);
      });
    },
  });
  storage.on("connection", () => console.log("Connected to GridFS storage"));
  storage.on("error", (err) => console.error("GridFS storage error:", err));
  return multer({ storage });
};
