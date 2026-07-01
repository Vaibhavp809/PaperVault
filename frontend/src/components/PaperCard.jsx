import { Download, Eye, GraduationCap } from "lucide-react";
import { API_BASE_URL } from "../services/api.js";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date));

const PaperCard = ({ paper }) => (
  <article className="glass group flex h-full flex-col rounded-lg p-5 transition hover:-translate-y-1 hover:shadow-glow">
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
        <GraduationCap className="h-5 w-5" />
      </div>
      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
        Sem {paper.semester}
      </span>
    </div>
    <h3 className="line-clamp-2 text-lg font-bold text-slate-950 dark:text-white">{paper.subjectName}</h3>
    <p className="mt-1 text-sm font-semibold text-teal-700 dark:text-teal-300">{paper.subjectCode}</p>
    <dl className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
      <div className="flex justify-between gap-4">
        <dt>Department</dt>
        <dd className="text-right font-medium">{paper.department}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt>Academic Year</dt>
        <dd className="font-medium">{paper.academicYear}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt>Exam Type</dt>
        <dd className="font-medium">{paper.examType}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt>Uploaded</dt>
        <dd className="font-medium">{formatDate(paper.createdAt)}</dd>
      </div>
    </dl>
    <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
      <a className="btn-secondary" href={`${API_BASE_URL}/papers/${paper._id}/view`} target="_blank" rel="noreferrer">
        <Eye className="h-4 w-4" />
        View
      </a>
      <a className="btn-primary" href={`${API_BASE_URL}/papers/${paper._id}/download`}>
        <Download className="h-4 w-4" />
        Download
      </a>
    </div>
  </article>
);

export default PaperCard;
