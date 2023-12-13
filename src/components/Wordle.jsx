import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keyboard";
import Modal from "./Modal";

const Wordle = ({ solution, validGuesses, wordLength, maxAttempts }) => {
  const { currentGuess, guesses, isCorrect, attemptNo, usedKeys, handleKeyUp } =
    useWordle(solution, validGuesses, wordLength, maxAttempts);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyUp);
    }

    if (attemptNo > maxAttempts) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyUp);
    }

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp, isCorrect, attemptNo]);

  return (
    <div>
      <div>solution - {solution}</div>
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        attemptNo={attemptNo}
      />
      <Keypad usedKeys={usedKeys} handleKeyUp={handleKeyUp} />
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          attemptNo={attemptNo}
          solution={solution}
        />
      )}
    </div>
  );
};

export default Wordle;
