import asyncHandler from "../utils/asyncHandler.js";
import {
  createPaper,
  deletePaper,
  getPaperById,
  getStats,
  listPapers,
  updatePaper
} from "../services/paperService.js";
import { buildSignedPdfUrl } from "../services/cloudinaryService.js";

export const getPapers = asyncHandler(async (req, res) => {
  res.json(await listPapers(req.query));
});

export const searchPapers = asyncHandler(async (req, res) => {
  res.json(await listPapers(req.query));
});

export const getPaper = asyncHandler(async (req, res) => {
  const paper = await getPaperById(req.params.id);
  if (!paper) {
    res.status(404);
    throw new Error("Question paper not found");
  }
  res.json(paper);
});

export const redirectToPaperPdf = asyncHandler(async (req, res) => {
  const paper = await getPaperById(req.params.id);
  if (!paper) {
    res.status(404);
    throw new Error("Question paper not found");
  }

  const signedUrl = buildSignedPdfUrl(paper.cloudinaryPublicId, {
    download: req.query.download === "true",
    fileName: paper.originalFileName
  });

  res.redirect(signedUrl);
});

export const createQuestionPaper = asyncHandler(async (req, res) => {
  const paper = await createPaper(req.body, req.file);
  res.status(201).json(paper);
});

export const updateQuestionPaper = asyncHandler(async (req, res) => {
  const paper = await updatePaper(req.params.id, req.body, req.file);
  if (!paper) {
    res.status(404);
    throw new Error("Question paper not found");
  }
  res.json(paper);
});

export const deleteQuestionPaper = asyncHandler(async (req, res) => {
  const paper = await deletePaper(req.params.id);
  if (!paper) {
    res.status(404);
    throw new Error("Question paper not found");
  }
  res.json({ message: "Question paper deleted" });
});

export const getPaperStats = asyncHandler(async (_req, res) => {
  res.json(await getStats());
});
