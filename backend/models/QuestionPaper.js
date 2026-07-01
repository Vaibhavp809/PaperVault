import mongoose from "mongoose";

const questionPaperSchema = new mongoose.Schema(
  {
    department: { type: String, required: true, trim: true, index: true },
    semester: { type: Number, required: true, min: 1, max: 12, index: true },
    subjectName: { type: String, required: true, trim: true, index: true },
    subjectCode: { type: String, required: true, uppercase: true, trim: true, index: true },
    academicYear: { type: String, required: true, trim: true, index: true },
    examType: { type: String, required: true, trim: true, index: true },
    cloudinaryUrl: { type: String, required: true },
    cloudinaryPublicId: { type: String, required: true },
    fileSize: { type: Number, default: 0 },
    originalFileName: { type: String, trim: true }
  },
  { timestamps: true }
);

questionPaperSchema.index(
  { subjectCode: 1, academicYear: 1, examType: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

questionPaperSchema.index({
  subjectName: "text",
  subjectCode: "text",
  department: "text",
  academicYear: "text",
  examType: "text"
});

const QuestionPaper = mongoose.model("QuestionPaper", questionPaperSchema);

export default QuestionPaper;

