import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    documentType: {
      type: String,
      default: "Other",
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    path: {
      type: String,
    },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

export default File;
