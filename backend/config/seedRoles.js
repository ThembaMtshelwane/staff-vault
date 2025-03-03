import mongoose from "mongoose";
import Role from "../model/roleModel.js";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

console.log(process.env.MONGO_URI);


const seedRoles = async () => {
  try {
    await Role.insertMany([
      {
        name: "supervisor",
        permissions: ["manage_own_files", "manage_files"],
      },
      {
        name: "subordinate",
        permissions: ["manage_own_files"],
        level: 2,
      },
    ]);
    console.log("Roles seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding roles:", error);
    mongoose.connection.close();
  }
};

seedRoles();
