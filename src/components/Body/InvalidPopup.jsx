import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function InvalidPopup() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div className={`invalid-popup ${darkTheme ? "dark" : ""}`}>
      Not in word list
    </div>
  );
}
