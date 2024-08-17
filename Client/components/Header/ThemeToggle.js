import { useState, useEffect } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button className="pl-2 pt-2" onClick={toggleDarkMode}>
      {isDarkMode ?  <BsSunFill className="text-green-600 dark:text-[#41B06E]" /> : <BsMoonFill className="text-green-600 dark:text-[#41B06E]" /> }
    </button>
  );
}
