import express from "express";
import { body } from "express-validator";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.use(auth); // all routes below require auth

router.get("/", getTodos);

router.post(
  "/",
  [
    body("title")
      .notEmpty()
      .withMessage("Title required")
      .isLength({ max: 100 })
      .withMessage("Title max length 100"),
    body("description")
      .optional()
      .isLength({ max: 500 })
      .withMessage("Description max length 500"),
    body("category").optional().isIn(["Urgent", "Non-Urgent"]),
  ],
  validate,
  createTodo
);

router.put("/:id", validate, updateTodo);
router.delete("/:id", deleteTodo);

export default router;
