import multer from "multer";

const storage = multer.memoryStorage();

const pdfFileFilter = (_req, file, callback) => {
  const isPdf =
    file.mimetype === "application/pdf" ||
    file.originalname.toLowerCase().endsWith(".pdf");

  if (!isPdf) return callback(new Error("Only PDF files are allowed"), false);
  return callback(null, true);
};

export const uploadPdf = multer({
  storage,
  fileFilter: pdfFileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }
});

