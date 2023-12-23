import React, { useContext, useState } from "react";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { ThemeContext } from "../contexts/ThemeContext";

export default function GameModeSelector() {
  const { darkTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const toggleGameMode = (gameMode) => {
    // TODO: need to set up Context
  };

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
        <DropDownItem
          gameMode={"Wordl"}
          onClick={() => toggleGameMode("Wordl")}
          className="top-radius"
        />
        <DropDownItem
          gameMode={"Wordle"}
          onClick={() => toggleGameMode("Wordle")}
          className="no-radius"
        />
        <DropDownItem
          gameMode={"Worldee"}
          onClick={() => toggleGameMode("Wordlee")}
          className="bottom-radius"
        />
      </div>
    </div>
  );
}

function DropDownItem({ gameMode, className }) {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <button className={`dropdown-item ${className} ${darkTheme ? "dark" : ""}`}>
      {gameMode}
    </button>
  );
}
