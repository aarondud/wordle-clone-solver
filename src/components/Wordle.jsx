import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

const Wordle = ({ solution }) => {
  const maxAttempts = 6 - 1; // why 5 here not 6... depends on where we are adding attempts...

  const { currentGuess, guesses, isCorrect, attemptNo, handleKeyUp } =
    useWordle(solution);
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
      <Keypad />
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
