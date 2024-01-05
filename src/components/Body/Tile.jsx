import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameModeContext } from "../../contexts/GameModeContext";

const Tile = ({ letter, color, filled, past, correct }) => {
  const { darkTheme } = useContext(ThemeContext);

  const [animate, setAnimate] = useState(false);
  const { gameMode } = useContext(GameModeContext);

  useEffect(() => {
    setAnimate(true);
    const timeOut = gameMode.length * 300;
    setTimeout(() => setAnimate(false), timeOut);
  }, [gameMode]);

  return (
    <div
      className={`tile ${filled ? "filled" : ""} ${past ? "past" : ""} ${
        correct ? "correct" : ""
      } ${color ? color : ""} ${animate ? "fade-in-grid" : ""} ${
        darkTheme ? "dark" : ""
      }`}
      key={letter}
    >
      {letter || ""}
    </div>
  );
};

export default Tile;
