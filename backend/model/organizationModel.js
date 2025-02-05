import { type } from "express/lib/response";
import mongoose from "mongoose";

const organizationSchema = mongo.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    staffList: {
      type: [String],
      default: [],
    },
    departments: [
      {
        name: {
          type: String,
          default: "",
        },
        email: {
          type: String,
          required: true,
          match: [/.+@.+\..+/, "Please enter a valid email"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
