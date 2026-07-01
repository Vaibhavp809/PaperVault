import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <button className="btn-secondary px-3" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
      {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;

