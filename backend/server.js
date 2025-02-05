import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || "9000";

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
