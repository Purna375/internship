"use client"; 

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  return (
    <button
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  className="absolute top-4 right-18 p-2 border rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition"
>
  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
</button>
  );
}
