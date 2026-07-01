import { Edit3, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Pagination from "../components/Pagination.jsx";
import PaperForm from "../components/PaperForm.jsx";
import SearchFilters from "../components/SearchFilters.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useDebounce } from "../hooks/useDebounce.js";
import api from "../services/api.js";

const AdminManage = () => {
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const [papers, setPapers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [editing, setEditing] = useState(null);
  const { pushToast } = useToast();
  const debouncedFilters = useDebounce(filters);

  const cleanFilters = useMemo(() => Object.fromEntries(Object.entries(debouncedFilters).filter(([, value]) => value !== "" && value !== undefined)), [debouncedFilters]);

  const loadPapers = () => {
    api.get("/papers", { params: cleanFilters }).then(({ data }) => {
      setPapers(data.items);
      setPagination(data.pagination);
    });
  };

  useEffect(() => {
    loadPapers();
  }, [cleanFilters]);

  const deletePaper = async (paper) => {
    if (!confirm(`Delete ${paper.subjectCode} ${paper.academicYear}?`)) return;
    try {
      await api.delete(`/papers/${paper._id}`);
      pushToast("Paper deleted");
      loadPapers();
    } catch (error) {
      pushToast(error.response?.data?.message || "Delete failed", "error");
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-extrabold">Manage Papers</h1>
      <div className="mt-6">
        <SearchFilters filters={filters} onChange={setFilters} compact />
      </div>
      {editing && (
        <div className="mt-6">
          <PaperForm paper={editing} onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); loadPapers(); }} />
        </div>
      )}
      <div className="glass mt-6 overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-500 dark:bg-white/5 dark:text-slate-400">
              <tr>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4">Department</th>
                <th className="px-5 py-4">Semester</th>
                <th className="px-5 py-4">Year</th>
                <th className="px-5 py-4">Exam</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {papers.map((paper) => (
                <tr key={paper._id}>
                  <td className="px-5 py-4">
                    <p className="font-bold">{paper.subjectName}</p>
                    <p className="text-slate-500 dark:text-slate-400">{paper.subjectCode}</p>
                  </td>
                  <td className="px-5 py-4">{paper.department}</td>
                  <td className="px-5 py-4">Sem {paper.semester}</td>
                  <td className="px-5 py-4">{paper.academicYear}</td>
                  <td className="px-5 py-4">{paper.examType}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="btn-secondary px-3" onClick={() => setEditing(paper)} aria-label="Edit paper"><Edit3 className="h-4 w-4" /></button>
                      <button className="btn-secondary px-3 text-rose-600 hover:text-rose-600" onClick={() => deletePaper(paper)} aria-label="Delete paper"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!papers.length && (
                <tr>
                  <td className="px-5 py-8 text-center text-slate-500 dark:text-slate-400" colSpan="6">No papers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination pagination={pagination} onPageChange={(page) => setFilters((current) => ({ ...current, page }))} />
    </section>
  );
};

export default AdminManage;

