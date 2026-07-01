import express from "express";
import {
  createQuestionPaper,
  deleteQuestionPaper,
  getPaper,
  getPaperStats,
  getPapers,
  redirectToPaperPdf,
  searchPapers,
  updateQuestionPaper
} from "../controllers/paperController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadPdf } from "../middleware/uploadMiddleware.js";
import { listValidation, mongoIdValidation, paperValidation } from "../middleware/validators.js";

const router = express.Router();

router.get("/", listValidation, getPapers);
router.get("/search", listValidation, searchPapers);
router.get("/stats", getPaperStats);
router.get("/:id/view", mongoIdValidation, redirectToPaperPdf);
router.get("/:id/download", mongoIdValidation, (req, _res, next) => {
  req.query.download = "true";
  next();
}, redirectToPaperPdf);
router.get("/:id", mongoIdValidation, getPaper);
router.post("/", protect, uploadPdf.single("pdf"), paperValidation, createQuestionPaper);
router.put("/:id", protect, uploadPdf.single("pdf"), mongoIdValidation, paperValidation, updateQuestionPaper);
router.delete("/:id", protect, mongoIdValidation, deleteQuestionPaper);

export default router;
