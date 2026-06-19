import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("qyzz_theme") === "dark" || 
      (!localStorage.getItem("qyzz_theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("qyzz_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("qyzz_theme", "light");
    }
  }, [isDark]);

  return (
    <button
      id="theme-toggle-btn"
      onClick={() => setIsDark(!isDark)}
      className="relative p-2.5 rounded-full overflow-hidden transition-all duration-300 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun className={`absolute w-5 h-5 transition-transform duration-500 ${isDark ? "translate-y-8 rotate-45 scale-0" : "translate-y-0 rotate-0 scale-100"}`} />
        <Moon className={`absolute w-5 h-5 transition-transform duration-500 ${isDark ? "translate-y-0 rotate-0 scale-100" : "-translate-y-8 -rotate-45 scale-0"}`} />
      </div>
    </button>
  );
}
