import React, { useContext, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameModeContext } from "../../contexts/GameModeContext";

const HelperModal = ({ showModal, setShowModal }) => {
  const { darkTheme } = useContext(ThemeContext);
  const { gameMode, wordLength } = useContext(GameModeContext);

  /*
  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      const modalContent = document.querySelector(".modal-content");
      console.log(showModal);
      if (showModal && !modalContent.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.body.addEventListener("click", handleClickOutsideModal);

    return () => {
      document.body.removeEventListener("click", handleClickOutsideModal);
    };
  }, [showModal]);
  */

  return (
    <div className={`modal-content helper ${darkTheme ? "dark" : ""}`}>
      <button
        className={`modal-exit-button ${darkTheme ? "dark" : ""}`}
        onClick={() => setShowModal(false)}
      >
        <CloseIcon />
      </button>
      <h1>How To Play</h1>
      <h3>
        Guess the <p className="gameMode">{gameMode}</p> in 6 tries.
      </h3>
      <ul>
        <li>Each guess must be a valid {wordLength}-word</li>
        <li>
          The colour of the tiles will change to show how close your guess was
          to the word
        </li>
      </ul>
      <hr />
      <h3>Choose Your Game Mode.</h3>
      <p>
        From the drop down menu select the Game Mode you would like to play:
      </p>
      <ul>
        <li>Wordl: a 4-letter word solution</li>
        <li>Wordle: a 5-letter word solution</li>
        <li>Wordlee: a 6-letter word solution</li>
      </ul>
      <hr />
      <h3>Run the Solving Bot.</h3>
      <p>Select the "Solve" bar to see the solving algorithms in action.</p>
      <ul>
        <li>Algo 1: desc... </li>
        <li>Algo 2: desc... </li>
        <li>Algo 3: desc... </li>
      </ul>
    </div>
  );
};

export default HelperModal;
