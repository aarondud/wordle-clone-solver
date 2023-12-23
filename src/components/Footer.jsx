import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Footer() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div className={`footer ${darkTheme ? "dark" : ""}`}>
      thanks for visiting :)
    </div>
  );
}
