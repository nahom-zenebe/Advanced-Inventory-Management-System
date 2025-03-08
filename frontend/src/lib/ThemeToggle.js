import { useEffect, useState } from "react";
import { LuMoon } from "react-icons/lu";
import { IoIosSunny } from "react-icons/io";



const ThemeToggle = () => {
  
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme} >
      {theme === "light" ? <LuMoon className="text-3xl" /> :<IoIosSunny  className="text-3xl text-orange-500"/>}
    </button>
  );
};

export default ThemeToggle;
