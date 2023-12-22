import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { LightMode, DarkMode } from "@mui/icons-material";

function ThemeToggler() {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className="icon"
      onClick={toggleTheme}
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      tabIndex="-1"
    >
      {darkTheme ? <DarkMode /> : <LightMode />}
    </button>
  );
}

export default ThemeToggler;
