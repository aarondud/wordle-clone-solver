import React from "react";

const Key = ({ letter, color, onClick }) => (
  <div
    className={`key ${color} hover-clickable ${
      letter === "⌫" || letter === "Enter" ? "big" : ""
    }`}
    key={letter}
    onClick={onClick}
  >
    {letter.toLocaleUpperCase()}
  </div>
);

export default Key;
