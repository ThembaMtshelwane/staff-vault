import mongoose from "mongoose";

const departmentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
