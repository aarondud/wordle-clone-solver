import React from "react";
import { useContext } from "react";
import {
  FaBars,
  FaGithub,
  FaSun,
  FaMoon,
  FaToggleOff,
  FaToggleOn,
  FaInfoCircle,
} from "react-icons/fa";
import {
  LinkedIn,
  GitHub,
  LogoDev,
  Info,
  LightMode,
  DarkMode,
} from "@mui/icons-material";
import { ThemeContext } from "../contexts/ThemeContext";
import ThemeToggler from "./ThemeToggler";

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

        <div className="icon" onClick={toggleGameMode}>
          {gameMode === "Wordle" ? <FaToggleOff /> : <FaToggleOn />}
        </div>
      </div>
    </nav>
  );
}
