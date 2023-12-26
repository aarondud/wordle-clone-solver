import React, { useContext, useState, useEffect } from "react";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { ThemeContext } from "../../contexts/ThemeContext";
import useWordle from "../../hooks/useWordle";
import { GameModeContext } from "../../contexts/GameModeContext";

export default function GameModeSelector() {
  const { darkTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (dropdownOpen && !menuContainer.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const menuContainer = document.querySelector(".menu-container");
    document.body.addEventListener("click", handleClickOutsideMenu);

    return () => {
      document.body.removeEventListener("click", handleClickOutsideMenu);
    };
  }, [dropdownOpen]);

  return (
    <div className="menu-container">
      <div
        className={`icon menu-trigger ${dropdownOpen ? "inverted" : ""}`}
        onClick={() => toggleDropdown()}
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
        <DropDownItem newGameMode={"Worldee"} className="bottom-radius" />
      </div>
    </div>
  );
}

function DropDownItem({ newGameMode, className }) {
  const { darkTheme } = useContext(ThemeContext);
  const { gameMode } = useContext(GameModeContext);
  const { newGame } = useWordle();

  return (
    <button
      className={`dropdown-item  ${
        gameMode === newGameMode ? "current" : ""
      } ${className} ${darkTheme ? "dark" : ""}`}
      onClick={() => gameMode !== newGameMode && newGame(newGameMode)}
    >
      {newGameMode}
    </button>
  );
}
