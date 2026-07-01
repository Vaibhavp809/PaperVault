import { body, param, query, validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  res.status(422).json({
    message: "Validation failed",
    errors: errors.array().map((error) => ({
      field: error.path,
      message: error.msg
    }))
  });
};

export const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  validate
];

export const paperValidation = [
  body("department").trim().notEmpty().withMessage("Department is required"),
  body("semester").isInt({ min: 1, max: 12 }).withMessage("Semester must be between 1 and 12"),
  body("subjectName").trim().notEmpty().withMessage("Subject name is required"),
  body("subjectCode").trim().notEmpty().withMessage("Subject code is required"),
  body("academicYear")
    .trim()
    .matches(/^\d{4}(-\d{2,4})?$/)
    .withMessage("Academic year must look like 2024 or 2023-24"),
  body("examType").trim().notEmpty().withMessage("Exam type is required"),
  validate
];

export const mongoIdValidation = [
  param("id").isMongoId().withMessage("Valid paper id is required"),
  validate
];

export const listValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive number"),
  query("limit").optional().isInt({ min: 1, max: 50 }).withMessage("Limit must be 1-50"),
  validate
];

