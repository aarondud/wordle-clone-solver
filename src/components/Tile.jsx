import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Tile = ({ letter, color, filled, past }) => {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div
      className={`tile ${filled ? "filled" : ""} ${past ? "past" : ""} ${
        color ? color : ""
      } ${darkTheme ? "dark" : ""}`}
      key={letter}
    >
      {letter || ""}
    </div>
  );
};

export default Tile;
