import { BookOpen, Building2, CalendarRange, LibraryBig } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api.js";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/papers/stats").then(({ data }) => setStats(data));
  }, []);

  const cards = [
    { label: "Total Papers", value: stats?.totalPapers ?? "-", icon: BookOpen },
    { label: "Departments", value: stats?.departments ?? "-", icon: Building2 },
    { label: "Subjects", value: stats?.subjects ?? "-", icon: LibraryBig },
    { label: "Academic Years", value: stats?.academicYears ?? "-", icon: CalendarRange }
  ];

  return (
    <section>
      <h1 className="text-3xl font-extrabold">Dashboard</h1>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass rounded-lg p-6">
            <Icon className="h-6 w-6 text-teal-600 dark:text-teal-300" />
            <p className="mt-6 text-3xl font-extrabold">{value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminDashboard;

