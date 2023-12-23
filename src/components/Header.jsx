import React, { useContext } from "react";
import { LinkedIn, GitHub, LogoDev, Info } from "@mui/icons-material";
import { ThemeContext } from "../contexts/ThemeContext";
import ThemeToggler from "./ThemeToggler";
import GameModeSelector from "./GameModeSelector";

export default function Header({ toggleGameMode, gameMode, toggleInfo }) {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${darkTheme ? "dark" : ""}`}>
      <div className="icons">
        <a className="icon">
          <LogoDev />
        </a>
        <a
          className="icon"
          href="https://www.linkedin.com/in/aaron-dudley/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn />
        </a>
        <a
          className="icon"
          href="https://github.com/aarondud/wordle_clone_solver"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </a>
      </div>
      <div className="header">
        <h1>{gameMode}</h1>
      </div>
      <div className="icons">
        <button className="icon" onClick={toggleInfo}>
          <Info />
        </button>
        <ThemeToggler />
        <GameModeSelector />
      </div>
    </nav>
  );
}
/*  <div className="icon" onClick={toggleGameMode}>
          {gameMode === "Wordle" ? <FaToggleOff /> : <FaToggleOn />}
        </div> */
