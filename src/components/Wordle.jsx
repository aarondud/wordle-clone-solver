import React, { useEffect, useContext, useState } from "react";
import Grid from "./Body/Grid";
import Keyboard from "./Keyboard/Keyboard";
import { ThemeContext } from "../contexts/ThemeContext";
import { GameModeContext } from "../contexts/GameModeContext";

const Wordle = ({ updateModalType, setShowModal }) => {
  const { darkTheme } = useContext(ThemeContext);
  const { maxAttempts, isCorrect, attemptNo, handleKeyUp } =
    useContext(GameModeContext);

  useEffect(() => {
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
    </div>
  );
};

export default Wordle;
