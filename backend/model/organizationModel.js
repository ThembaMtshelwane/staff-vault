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
    staffEmails: {
      type: [String],
      default: [],
    },
    registrationNumber: {
      type: String,
      required: true,
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
