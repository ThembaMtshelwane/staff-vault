import mongoose from "mongoose";

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
    registrationNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
