import React, { useEffect, useContext } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid/Grid";
import Keyboard from "./Keyboard/Keyboard";
import { ThemeContext } from "../contexts/ThemeContext";
import { GameModeContext } from "../contexts/GameModeContext";

const Wordle = ({ setShowModal, setModalType }) => {
  const { darkTheme } = useContext(ThemeContext);
  const { maxAttempts } = useContext(GameModeContext);

  const {
    currentGuess,
    guesses,
    isCorrect,
    attemptNo,
    usedKeys,
    handleKeyUp,
    isInvalid,
  } = useWordle();

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    if (isCorrect) {
      const rowElements = document.querySelectorAll(".row.past");
      const winningRow = Array.from(rowElements).pop();
      const tiles = Array.from(winningRow.querySelectorAll(".tile"));
      setTimeout(() => {
        tiles.map((tileElement) => tileElement.classList.add("waterfall"));
      }, 2000);

      setTimeout(() => {
        setModalType("win");
        setShowModal(true);
      }, 4000);
    }

    if (attemptNo >= maxAttempts) {
      setModalType("lose");
      setTimeout(() => setShowModal(true), 4000);
    }

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp, isCorrect, attemptNo]);

  return (
    <div className={`wordle ${darkTheme ? "dark" : ""}`}>
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        attemptNo={attemptNo}
        isInvalid={isInvalid}
      />
      <Keyboard usedKeys={usedKeys} handleKeyUp={handleKeyUp} />
    </div>
  );
};

export default Wordle;
