import React, { useContext, useState, useEffect } from "react";
import { LinkedIn, GitHub, Info } from "@mui/icons-material";
import { ThemeContext } from "../../contexts/ThemeContext";
import ThemeToggler from "./ThemeToggler";
import GameModeSelector from "./GameModeSelector";
import { GameModeContext } from "../../contexts/GameModeContext";

export default function Header({ toggleModal, updateModalType }) {
  const { darkTheme } = useContext(ThemeContext);
  const { gameMode } = useContext(GameModeContext);
  const [animateE, setAnimateE] = useState(false);

  const socialLinks = [
    {
      icon: (
        <img
          src={`/public/${
            darkTheme ? "memoji-icon-light" : "memoji-icon-dark"
          }.png`}
          className="memoji-icon"
        ></img>
      ),
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      icon: <GitHub />,
      link: "https://github.com/aarondud/wordle_clone_solver",
    },
    {
      icon: <LinkedIn />,
      link: "https://www.linkedin.com/in/aaron-dudley/",
    },
  ];

  useEffect(() => {
    const isWordle = gameMode === "Wordle";
    const isWordlee = gameMode === "Wordlee";

    // Set animation state based on game mode
    setAnimateE(isWordle || isWordlee);
  }, [gameMode]);

  return (
    <nav className={`navbar ${darkTheme ? "dark" : ""}`}>
      <div className={`social-icons ${darkTheme ? "dark" : ""}`}>
        {socialLinks.map(({ icon, link }, index) => (
          <a
            key={index}
            className="icon"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          >
            {icon}
          </a>
        ))}
      </div>
      <h1 className={`title ${darkTheme ? "dark" : ""}`}>
        {Array.from(gameMode).map((char, index) => (
          <span
            key={index}
            className={`title-char ${
              animateE && char.toLowerCase() === "e" ? "fade-in" : "fade-out"
            }`}
          >
            {char}
          </span>
        ))}
      </h1>
      <div className={`icons ${darkTheme ? "dark" : ""}`}>
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
