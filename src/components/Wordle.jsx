import React, { useEffect, useContext } from "react";
import Grid from "./Body/Grid";
import Keyboard from "./Keyboard/Keyboard";
import { ThemeContext } from "../contexts/ThemeContext";
import { GameModeContext } from "../contexts/GameModeContext";
// import SolverButton from "./SolverButton";

const Wordle = ({ updateModalType, setShowModal }) => {
  const { darkTheme } = useContext(ThemeContext);
  const { maxAttempts, isCorrect, attemptNo, handleKeyUp, solverOn, solution, currentGuess, guesses } =
    useContext(GameModeContext);

  useEffect(() => {
    // add event listener for keyboard input
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  useEffect(() => {
    // check if game is over
    if (solverOn) {
      if (isCorrect) {
        updateModalType("solver");
        setShowModal(true);
      }
      return;
    }
    
    if (isCorrect) {
      window.removeEventListener("keyup", handleKeyUp);
      updateModalType("win");
      setShowModal(true);
      return;
    }

    if (attemptNo >= maxAttempts) {
      updateModalType("lose");
      setShowModal(true);
      return;
    }

  }, [guesses])

  return (
    <div className={`wordle ${darkTheme ? "dark" : ""}`}>
      <Grid />
      <Keyboard />
      {/* <SolverButton /> */}
    </div>
  );
};

export default Wordle;
