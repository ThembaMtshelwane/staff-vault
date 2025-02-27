import mongoose from "mongoose";

const departmentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    supervisor: {
      name: { type: String },
      email: {
        type: String,
        match: [/.+@.+\..+/, "Please enter a valid email"],
      },
      staff: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
    },
    positions: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;
export { departmentSchema };
