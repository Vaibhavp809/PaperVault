import { useState } from "react";
import { UploadCloud } from "lucide-react";
import api from "../services/api.js";
import { useToast } from "../context/ToastContext.jsx";
import { departments, examTypes, semesters } from "../constants/paperOptions.js";

const initialState = {
  department: "",
  semester: "",
  subjectName: "",
  subjectCode: "",
  academicYear: "",
  examType: ""
};

const PaperForm = ({ paper, onSaved, onCancel }) => {
  const [form, setForm] = useState(paper || initialState);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const { pushToast } = useToast();

  const setField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!paper && !pdf) return pushToast("PDF file is required", "error");
    if (pdf && pdf.type !== "application/pdf") return pushToast("Only PDF files are allowed", "error");

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    if (pdf) body.append("pdf", pdf);

    setLoading(true);
    try {
      if (paper?._id) await api.put(`/papers/${paper._id}`, body);
      else await api.post("/papers", body);
      pushToast(paper ? "Paper updated" : "Paper uploaded");
      setForm(initialState);
      setPdf(null);
      onSaved?.();
    } catch (error) {
      pushToast(error.response?.data?.message || "Save failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-lg p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <select className="input" value={form.department} onChange={(event) => setField("department", event.target.value)} required>
          <option value="">Select department</option>
          {departments.map((department) => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>
        <select className="input" value={form.semester} onChange={(event) => setField("semester", event.target.value)} required>
          <option value="">Select semester</option>
          {semesters.map((semester) => (
            <option key={semester} value={semester}>Semester {semester}</option>
          ))}
        </select>
        <input className="input" placeholder="Subject name" value={form.subjectName} onChange={(event) => setField("subjectName", event.target.value)} required />
        <input className="input" placeholder="Subject code" value={form.subjectCode} onChange={(event) => setField("subjectCode", event.target.value.toUpperCase())} required />
        <input className="input" placeholder="Academic year, e.g. 2024-25" value={form.academicYear} onChange={(event) => setField("academicYear", event.target.value)} required />
        <select className="input" value={form.examType} onChange={(event) => setField("examType", event.target.value)} required>
          <option value="">Select exam type</option>
          {examTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-teal-300 bg-teal-50/60 px-4 py-8 text-center text-sm font-semibold text-teal-800 dark:border-teal-500/30 dark:bg-teal-500/10 dark:text-teal-200">
        <UploadCloud className="mb-3 h-7 w-7" />
        {pdf?.name || (paper ? "Replace PDF file" : "Choose PDF file")}
        <input className="sr-only" type="file" accept="application/pdf,.pdf" onChange={(event) => setPdf(event.target.files?.[0] || null)} />
      </label>
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="btn-primary" disabled={loading}>{loading ? "Saving..." : paper ? "Update paper" : "Upload paper"}</button>
        {onCancel && <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default PaperForm;
