import mongoose from "mongoose";
import { userSchema } from "./userModel.js";
import { departmentSchema } from "./departmentModel.js";

const organizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    admin: {
      type: String,
    },
    users: {
      type: [userSchema],
      default: [],
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    departments: {
      type: [departmentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
