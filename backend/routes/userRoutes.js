import express from "express";
import {
  createAdminUser,
  fetchAllUsers,
  loginUser,
  registerAllUsers,
  fetchUserById,
  deleteUser,
  addUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerAllUsers).get(fetchAllUsers);
router.post("/admin", createAdminUser);
router.post("/login", loginUser);
router.post("/register", addUser);
router.route("/:id").get(fetchUserById).delete(deleteUser);

export default router;
