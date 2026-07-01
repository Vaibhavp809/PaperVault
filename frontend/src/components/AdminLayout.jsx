import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, UploadCloud, Files } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/upload", label: "Upload", icon: UploadCloud },
  { to: "/admin/manage", label: "Manage", icon: Files }
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <aside className="fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85 lg:inset-x-auto lg:bottom-0 lg:w-72 lg:border-b-0 lg:border-r">
        <div className="flex h-full items-center justify-between gap-4 px-4 py-4 lg:flex-col lg:items-stretch lg:p-6">
          <div>
            <p className="text-lg font-extrabold">PaperVault Admin</p>
            <p className="hidden text-sm text-slate-500 dark:text-slate-400 lg:block">{admin?.email}</p>
          </div>
          <nav className="flex gap-2 overflow-x-auto lg:grid">
            {adminLinks.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"}`}>
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="btn-secondary px-3" onClick={handleLogout} aria-label="Logout">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
      <main className="px-4 pb-10 pt-28 sm:px-6 lg:ml-72 lg:px-10 lg:pt-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

