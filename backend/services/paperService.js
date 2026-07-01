import QuestionPaper from "../models/QuestionPaper.js";
import { deleteFromCloudinary, uploadPdfToCloudinary } from "./cloudinaryService.js";

const normalizePaperPayload = (payload) => ({
  department: payload.department?.trim(),
  semester: Number(payload.semester),
  subjectName: payload.subjectName?.trim(),
  subjectCode: payload.subjectCode?.trim().toUpperCase(),
  academicYear: payload.academicYear?.trim(),
  examType: payload.examType?.trim()
});

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildFilters = (query) => {
  const filters = {};

  ["department", "academicYear", "examType"].forEach((field) => {
    if (query[field]) filters[field] = new RegExp(query[field], "i");
  });

  if (query.semester) filters.semester = Number(query.semester);

  if (query.subjectCode) filters.subjectCode = new RegExp(query.subjectCode, "i");
  if (query.subjectName) filters.subjectName = new RegExp(query.subjectName, "i");

  if (query.q) {
    filters.$or = [
      { subjectName: new RegExp(query.q, "i") },
      { subjectCode: new RegExp(query.q, "i") },
      { department: new RegExp(query.q, "i") },
      { academicYear: new RegExp(query.q, "i") },
      { examType: new RegExp(query.q, "i") }
    ];
  }

  return filters;
};

export const listPapers = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 12;
  const skip = (page - 1) * limit;
  const filters = buildFilters(query);

  const [items, total] = await Promise.all([
    QuestionPaper.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit),
    QuestionPaper.countDocuments(filters)
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit) || 1
    }
  };
};

export const getPaperById = (id) => QuestionPaper.findById(id);

export const createPaper = async (payload, file) => {
  if (!file) {
    const error = new Error("PDF file is required");
    error.statusCode = 422;
    throw error;
  }

  const data = normalizePaperPayload(payload);
  const duplicate = await QuestionPaper.findOne({
    subjectCode: data.subjectCode,
    academicYear: data.academicYear,
    examType: new RegExp(`^${escapeRegex(data.examType)}$`, "i")
  });

  if (duplicate) {
    const error = new Error("A paper with this subject code, academic year, and exam type already exists");
    error.statusCode = 409;
    throw error;
  }

  const uploaded = await uploadPdfToCloudinary(file.buffer, file.originalname);

  return QuestionPaper.create({
    ...data,
    cloudinaryUrl: uploaded.secure_url,
    cloudinaryPublicId: uploaded.public_id,
    fileSize: file.size,
    originalFileName: file.originalname
  });
};

export const updatePaper = async (id, payload, file) => {
  const paper = await QuestionPaper.findById(id);
  if (!paper) return null;

  const data = normalizePaperPayload(payload);
  const duplicate = await QuestionPaper.findOne({
    _id: { $ne: id },
    subjectCode: data.subjectCode,
    academicYear: data.academicYear,
    examType: new RegExp(`^${escapeRegex(data.examType)}$`, "i")
  });

  if (duplicate) {
    const error = new Error("A paper with this subject code, academic year, and exam type already exists");
    error.statusCode = 409;
    throw error;
  }

  Object.assign(paper, data);

  if (file) {
    await deleteFromCloudinary(paper.cloudinaryPublicId);
    const uploaded = await uploadPdfToCloudinary(file.buffer, file.originalname);
    paper.cloudinaryUrl = uploaded.secure_url;
    paper.cloudinaryPublicId = uploaded.public_id;
    paper.fileSize = file.size;
    paper.originalFileName = file.originalname;
  }

  return paper.save();
};

export const deletePaper = async (id) => {
  const paper = await QuestionPaper.findById(id);
  if (!paper) return null;
  await deleteFromCloudinary(paper.cloudinaryPublicId);
  await paper.deleteOne();
  return paper;
};

export const getStats = async () => {
  const [totalPapers, departments, subjects, academicYears, recent] = await Promise.all([
    QuestionPaper.countDocuments(),
    QuestionPaper.distinct("department"),
    QuestionPaper.distinct("subjectCode"),
    QuestionPaper.distinct("academicYear"),
    QuestionPaper.find().sort({ createdAt: -1 }).limit(6)
  ]);

  return {
    totalPapers,
    departments: departments.length,
    subjects: subjects.length,
    academicYears: academicYears.length,
    recent
  };
};
