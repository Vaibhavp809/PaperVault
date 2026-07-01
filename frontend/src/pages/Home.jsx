import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Building2, CalendarRange, LibraryBig } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api.js";
import PaperCard from "../components/PaperCard.jsx";
import SearchFilters from "../components/SearchFilters.jsx";
import SkeletonGrid from "../components/SkeletonGrid.jsx";

const departments = ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil", "Electrical"];
const subjects = ["Data Structures", "Operating Systems", "DBMS", "Digital Circuits", "Thermodynamics", "Networks"];

const Home = () => {
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    api.get("/papers/stats").then(({ data }) => setStats(data)).catch(() => setStats({ recent: [] }));
  }, []);

  const statItems = [
    { label: "Total Papers", value: stats?.totalPapers ?? "-", icon: BookOpen },
    { label: "Departments", value: stats?.departments ?? "-", icon: Building2 },
    { label: "Subjects", value: stats?.subjects ?? "-", icon: LibraryBig },
    { label: "Academic Years", value: stats?.academicYears ?? "-", icon: CalendarRange }
  ];

  const searchUrl = `/search?${new URLSearchParams(filters).toString()}`;

  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="mb-4 w-fit rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-200">
            Premium question paper library
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            Find the exact paper before your next study sprint.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Browse previous year question papers by department, semester, subject code, academic year, and exam type.
          </p>
          <div className="mt-8">
            <SearchFilters filters={filters} onChange={setFilters} compact />
            <Link to={searchUrl} className="btn-primary mt-4">
              Search Library
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="glass grid content-between rounded-lg p-6">
          <div className="grid grid-cols-2 gap-4">
            {statItems.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
                <Icon className="h-5 w-5 text-teal-600 dark:text-teal-300" />
                <p className="mt-5 text-3xl font-extrabold">{value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg bg-slate-950 p-5 text-white dark:bg-white dark:text-slate-950">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-300 dark:text-teal-700">Recently indexed</p>
            <p className="mt-3 text-2xl font-bold">{stats?.recent?.[0]?.subjectName || "Ready for your library data"}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Departments</h2>
          <Link to="/search" className="text-sm font-semibold text-teal-700 dark:text-teal-300">View all</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => (
            <Link key={department} to={`/search?department=${encodeURIComponent(department)}`} className="glass rounded-lg p-5 transition hover:-translate-y-1">
              <Building2 className="h-5 w-5 text-teal-600 dark:text-teal-300" />
              <p className="mt-4 font-bold">{department}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Browse papers and subject archives</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="mb-5 text-2xl font-bold">Recently Uploaded Papers</h2>
        {!stats ? <SkeletonGrid count={3} /> : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {stats.recent?.length ? stats.recent.map((paper) => <PaperCard key={paper._id} paper={paper} />) : (
              <div className="glass rounded-lg p-8 text-slate-600 dark:text-slate-300">No papers uploaded yet.</div>
            )}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="mb-5 text-2xl font-bold">Popular Subjects</h2>
        <div className="flex flex-wrap gap-3">
          {subjects.map((subject) => (
            <Link key={subject} to={`/search?q=${encodeURIComponent(subject)}`} className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              {subject}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

