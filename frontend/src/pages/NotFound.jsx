import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="grid min-h-screen place-items-center px-4 text-center text-slate-900 dark:bg-slate-950 dark:text-white">
    <div>
      <p className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">404</p>
      <h1 className="mt-3 text-4xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">The page you opened does not exist.</p>
      <Link className="btn-primary mt-6" to="/">Go home</Link>
    </div>
  </main>
);

export default NotFound;
