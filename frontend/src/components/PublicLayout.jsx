import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/search", label: "Papers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];

const PublicLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen text-slate-900 dark:text-white">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 font-extrabold tracking-tight">
            <img src="/papervault-icon.svg" alt="" className="h-10 w-10 rounded-lg shadow-lg shadow-teal-600/20" />
            <span>PaperVault</span>
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-medium transition ${isActive ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300" : "text-slate-600 hover:text-teal-700 dark:text-slate-300"}`}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/search" className="btn-primary py-2.5">
              <Search className="h-4 w-4" />
              Find Papers
            </Link>
            <ThemeToggle />
          </div>
          <button className="btn-secondary px-3 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        {open && (
          <div className="mx-auto max-w-7xl px-4 pb-4 md:hidden">
            <div className="glass grid gap-2 rounded-lg p-3">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {link.label}
                </NavLink>
              ))}
              <ThemeToggle />
            </div>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-slate-200/80 px-4 py-10 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
        <p>PaperVault keeps library question papers searchable, accessible, and simple to manage.</p>
      </footer>
    </div>
  );
};

export default PublicLayout;
