import mongoose from "mongoose";

const departmentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    supervisor: {
      type: String,
    },
    staff: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;
export { departmentSchema };
