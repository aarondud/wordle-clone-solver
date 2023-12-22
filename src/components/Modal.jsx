import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Modal({ isCorrect, attemptNo, solution }) {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div className={`modal ${darkTheme ? "dark" : ""}`}>
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className="solution">{solution}</p>
          <p>You found the solution in {attemptNo} guesses</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>You Lose</h1>
          <p className="solution">{solution}</p>
          <p>Refresh page to try again</p>
        </div>
      )}
    </div>
  );
}
