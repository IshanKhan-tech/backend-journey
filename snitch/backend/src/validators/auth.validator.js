import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      errors: error.array(),
    });
  }

  next();
}

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),

  body("contact")
    .notEmpty()
    .withMessage("Contact is required")
    .matches(/^\d{10}$/)
    .withMessage("Contact must be a 10-digit number"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),

  body("fullname")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be 3 characters long"),

  body("isSeller")
    .isBoolean()
    .withMessage("isSeller must be a boolean value"),

  validateRequest,
];

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  validateRequest,
];

