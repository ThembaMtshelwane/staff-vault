import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import superAdminRoutes from './routes/superAdminRoutes.js'

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || "9000";

app.use('/api/superAdmin',superAdminRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
