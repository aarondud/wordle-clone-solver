import React, { useContext, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameModeContext } from "../../contexts/GameModeContext";

const HelperModal = ({ isModalVisible, exitModal }) => {
  const { darkTheme } = useContext(ThemeContext);
  const { gameMode, wordLength } = useContext(GameModeContext);
  const modalContent = useRef(null);

  useEffect(() => {
    // clicking outside of modal-content closes modal
    const handleClickOutsideModal = (event) => {
      if (isModalVisible && !modalContent.current.contains(event.target)) {
        exitModal();
      }
    };

    const modalOverlay = document.querySelector(".modal-overlay");
    modalOverlay.addEventListener("click", handleClickOutsideModal);

    return () => {
      modalOverlay.removeEventListener("click", handleClickOutsideModal);
    };
  }, [isModalVisible]);

  return (
    <div
      className={`modal-content helper ${isModalVisible ? "visible" : ""} ${
        darkTheme ? "dark" : ""
      }`}
      ref={modalContent}
    >
      <button
        className={`modal-exit-button ${darkTheme ? "dark" : ""}`}
        onClick={exitModal}
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
      <AlgorithmList />
    </div>
  );
};

const AlgorithmList = () => {
  <ul>
    <li>Algo 1: desc... </li>
    <li>Algo 2: desc... </li>
    <li>Algo 3: desc... </li>
  </ul>;
};

export default HelperModal;
