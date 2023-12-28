import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function InvalidPopup({ visible }) {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div
      className={`invalid-popup ${visible ? "visible" : ""} ${
        darkTheme ? "dark" : ""
      }`}
    >
      Not in word list
    </div>
  );
}
