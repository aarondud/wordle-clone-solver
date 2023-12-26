import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameModeContext } from "../../contexts/GameModeContext";

const HelperModal = ({ setShowModal }) => {
  const { darkTheme } = useContext(ThemeContext);
  const { gameMode, wordLength } = useContext(GameModeContext);
  return (
    <div className={`modal-content ${darkTheme ? "dark" : ""}`}>
      <button
        className={`modal-exit-button ${darkTheme ? "dark" : ""}`}
        onClick={() => setShowModal(false)}
      >
        <CloseIcon />
      </button>
      <h1>How To Play</h1>
      <h3>Guess the {gameMode} in 6 tries.</h3>
      <ul>
        <li>Each guess must be a valid {wordLength}-word</li>
        <li>
          The colour of the tiles will change to show how close your guess was
          to the word.
        </li>
      </ul>
      <hr />
      <h3>Choose Your Game Mode.</h3>
      <p>
        From the drop down menu select the Game Mode you would like to play{" "}
      </p>
      <p>
        Wordl: a 4-letter word solution, Wordle: a 5-letter word solution,
        Wordlee: a 6-letter word solution
      </p>
      <hr />
      <h3>Run the Solving Bot.</h3>
      <p>Hit the "solve" for me button to watch</p>
      <ul>
        <li>Algo 1: desc... </li>
        <li>Algo 2: desc... </li>
        <li>Algo 3: desc... </li>
      </ul>
    </div>
  );
};

export default HelperModal;
