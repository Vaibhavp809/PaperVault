import { Search } from "lucide-react";
import { departments, examTypes, semesters } from "../constants/paperOptions.js";

const SearchFilters = ({ filters, onChange, compact = false }) => {
  const update = (field, value) => onChange({ ...filters, [field]: value, page: 1 });

  return (
    <div className={`glass rounded-lg p-4 ${compact ? "" : "sm:p-5"}`}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input className="input pl-12" placeholder="Search subject, code, department, exam type..." value={filters.q || ""} onChange={(event) => update("q", event.target.value)} />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <select className="input" value={filters.department || ""} onChange={(event) => update("department", event.target.value)}>
          <option value="">All departments</option>
          {departments.map((department) => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>
        <select className="input" value={filters.semester || ""} onChange={(event) => update("semester", event.target.value)}>
          <option value="">All semesters</option>
          {semesters.map((semester) => (
            <option key={semester} value={semester}>Semester {semester}</option>
          ))}
        </select>
        <input className="input" placeholder="Subject code" value={filters.subjectCode || ""} onChange={(event) => update("subjectCode", event.target.value)} />
        <input className="input" placeholder="Academic year" value={filters.academicYear || ""} onChange={(event) => update("academicYear", event.target.value)} />
        <select className="input" value={filters.examType || ""} onChange={(event) => update("examType", event.target.value)}>
          <option value="">All exam types</option>
          {examTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;
