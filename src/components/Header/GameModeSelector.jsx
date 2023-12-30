import React, { useContext, useState, useEffect, useRef } from "react";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameModeContext } from "../../contexts/GameModeContext";

export default function GameModeSelector() {
  const { darkTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const gameModeSelectorRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (
        dropdownOpen &&
        gameModeSelectorRef.current &&
        !gameModeSelectorRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutsideMenu);

    return () => {
      document.body.removeEventListener("click", handleClickOutsideMenu);
    };
  }, [dropdownOpen]);

  return (
    <div className="game-mode-selector" ref={gameModeSelectorRef}>
      <div
        className={`icon menu-trigger ${dropdownOpen ? "inverted" : ""}`}
        onClick={toggleDropdown}
      >
        <ArrowDropDownCircleIcon />
      </div>
      <div
        className={`dropdown-menu ${dropdownOpen ? "active" : "inactive"} ${
          darkTheme ? "dark" : ""
        }`}
      >
        <DropDownItem newGameMode={"Wordl"} className="top-radius" />
        <DropDownItem newGameMode={"Wordle"} className="no-radius" />
        <DropDownItem newGameMode={"Wordlee"} className="bottom-radius" />
      </div>
    </div>
  );
}

function DropDownItem({ newGameMode, className }) {
  const { darkTheme } = useContext(ThemeContext);
  const { gameMode, toggleGameMode } = useContext(GameModeContext);

  return (
    <button
      className={`dropdown-item  ${
        gameMode === newGameMode ? "current" : ""
      } ${className} ${darkTheme ? "dark" : ""}`}
      onClick={() => gameMode !== newGameMode && toggleGameMode(newGameMode)}
    >
      {newGameMode}
    </button>
  );
}
