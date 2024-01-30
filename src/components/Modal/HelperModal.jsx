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
        Guess the <p className="gameMode">{gameMode}</p> in 6 Tries.
      </h3>
        <p>📘 Each guess must be a valid {wordLength}-letter word</p>
        <p>☑️ The colour of the tiles indicate the correctness of your guess ⬜️ 🟨 🟩
        </p>
      <hr />
      <h3>Choose Your Game Mode.</h3>
      <p>
        From the drop down menu select the Game Mode you would like to play:
      </p>
      <ul>
        <p>4️⃣ Wordl: a 4-letter word solution</p>
        <p>5️⃣ Wordle: a 5-letter word solution</p>
        <p>6️⃣ Wordlee: a 6-letter word solution</p>
      </ul>
      <hr />
      <h3>Upcoming Features.</h3>
      <p>📱 Mobile optimisation</p>
      <p>🤖 Live solving functionality - watch how advanced solving algorithms strategise to select words and uncover the solution</p>
    </div>
  );
};

export default HelperModal;
