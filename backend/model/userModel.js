import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    position: { type: String, default: "" },
    email: { type: String, required: true },
    password: { type: String, default: "st@f5Va_ul7" },
    role: {
      type: String,
      default: "general",
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
export { userSchema };
