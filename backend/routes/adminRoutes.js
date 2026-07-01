import express from "express";
import { getAdminProfile, loginAdmin } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { loginValidation } from "../middleware/validators.js";

const router = express.Router();

router.post("/login", loginValidation, loginAdmin);
router.get("/me", protect, getAdminProfile);

export default router;

