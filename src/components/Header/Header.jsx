import React, { useContext } from "react";
import { LinkedIn, GitHub, LogoDev, Info } from "@mui/icons-material";
import { ThemeContext } from "../../contexts/ThemeContext";
import ThemeToggler from "./ThemeToggler";
import GameModeSelector from "./GameModeSelector";
import { GameModeContext } from "../../contexts/GameModeContext";

export default function Header({ toggleModal, updateModalType }) {
  const { darkTheme } = useContext(ThemeContext);
  const { gameMode } = useContext(GameModeContext);

  const renderSocialIcons = () => (
    <>
      <a
        className="icon"
        href="https://github.com/aarondud/wordle_clone_solver"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub />
      </a>
      <a
        className="icon"
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        target="_blank"
        rel="noopener noreferrer"
      >
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
    </>
  );

  return (
    <nav className={`navbar ${darkTheme ? "dark" : ""}`}>
      <div className="social-icons">{renderSocialIcons()}</div>
      <h1 className="title">{gameMode}</h1>
      <div className="icons">
        <div
          className="icon"
          onClick={() => {
            updateModalType("helper");
            toggleModal();
          }}
        >
          <Info />
        </div>
        <ThemeToggler />
        <GameModeSelector />
      </div>
    </nav>
  );
}
