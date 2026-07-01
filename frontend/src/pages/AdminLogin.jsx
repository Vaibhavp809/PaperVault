import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const { pushToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form);
      pushToast("Welcome back");
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      pushToast(error.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="absolute right-4 top-4"><ThemeToggle /></div>
      <form onSubmit={handleSubmit} className="glass w-full max-w-md rounded-lg p-8">
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-teal-600 text-white">
          <LockKeyhole className="h-5 w-5" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold">Library admin</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Restricted librarian access.</p>
        <div className="mt-6 grid gap-4">
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required minLength={8} />
          <button className="btn-primary" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        </div>
      </form>
    </main>
  );
};

export default AdminLogin;

