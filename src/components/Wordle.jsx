import React, { useEffect, useContext } from "react";
import Grid from "./Body/Grid";
import Keyboard from "./Keyboard/Keyboard";
import { ThemeContext } from "../contexts/ThemeContext";
import { GameModeContext } from "../contexts/GameModeContext";
import SolverButton from "./SolverButton";

const Wordle = ({ updateModalType, setShowModal }) => {
  const { darkTheme } = useContext(ThemeContext);
  const { maxAttempts, isCorrect, attemptNo, handleKeyUp, solverOn } =
    useContext(GameModeContext);

  useEffect(() => {
    if (solverOn) {
      if (isCorrect) {
        updateModalType("solver");
        setShowModal(true);
      }
      return;
    }

    window.addEventListener("keyup", handleKeyUp);

    if (isCorrect) {
      window.removeEventListener("keyup", handleKeyUp);
      updateModalType("win");
      setShowModal(true);
    }
    if (attemptNo >= maxAttempts) {
      updateModalType("lose");
      setShowModal(true);
    }

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div className={`wordle ${darkTheme ? "dark" : ""}`}>
      <Grid />
      <Keyboard />
      <SolverButton />
    </div>
  );
};

export default Wordle;
