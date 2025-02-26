import expressAsyncHandler from "express-async-handler";

const uploadFile = expressAsyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }
  res.status(201).json({
    success: true,
    message: "File uploaded successfully",
    data: req.file,
  });
});

export { uploadFile };
