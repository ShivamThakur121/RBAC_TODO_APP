import express from "express";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";
import {
  getAllUsers,
  updateUserRole,
  getAllTodosAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(auth, requireRole("admin"));

router.get("/users", getAllUsers);
router.patch("/users/:id/role", updateUserRole);
router.get("/todos", getAllTodosAdmin);

export default router;
