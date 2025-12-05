import express from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("username").notEmpty().withMessage("Username required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  validate,
  register
);

router.post(
  "/login",
  [
    body("identifier").notEmpty().withMessage("Email or username required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  validate,
  login
);

export default router;
