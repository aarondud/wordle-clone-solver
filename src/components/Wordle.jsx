import React, { useEffect, useState, useContext } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import Modal from "./Modal";
import { ThemeContext } from "../contexts/ThemeContext";

const Wordle = ({ solution, validGuesses, wordLength, maxAttempts }) => {
  const {
    currentGuess,
    guesses,
    isCorrect,
    attemptNo,
    usedKeys,
    handleKeyUp,
    isInvalid,
  } = useWordle(solution, validGuesses, wordLength, maxAttempts);
  const [showModal, setShowModal] = useState(false);
  const { darkTheme, _ } = useContext(ThemeContext);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    if (isCorrect) {
      const rowElements = document.querySelectorAll(".row.past");
      const winningRow = Array.from(rowElements).pop();
      const tiles = Array.from(winningRow.querySelectorAll(".tile"));
      setTimeout(() => {
        tiles.map((tileElement) => tileElement.classList.add("waterfall")); // Add waterfall animation after delay
      }, 2000);

      setTimeout(() => setShowModal(true), 4000);
      window.removeEventListener("keyup", handleKeyUp);
    }

    if (attemptNo >= maxAttempts) {
      setTimeout(() => setShowModal(true), 4000);
      window.removeEventListener("keyup", handleKeyUp);
    }

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp, isCorrect, attemptNo]);

  return (
    <div className={`wordle ${darkTheme ? "dark" : ""}`}>
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        attemptNo={attemptNo}
        wordLength={wordLength}
        isInvalid={isInvalid}
      />
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          attemptNo={attemptNo}
          solution={solution}
        />
      )}
      <Keyboard usedKeys={usedKeys} handleKeyUp={handleKeyUp} />
    </div>
  );
};

export default Wordle;
