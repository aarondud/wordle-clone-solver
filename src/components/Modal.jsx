import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Modal = ({ isCorrect, attemptNo, solution }) => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`modal-overlay ${darkTheme ? "dark" : ""}`}>
      <EndOfGameModal
        isCorrect={isCorrect}
        attemptNo={attemptNo}
        solution={solution}
      />
    </div>
  );
};

const EndOfGameModal = ({ isCorrect, attemptNo, solution }) => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`modal-content ${darkTheme ? "dark" : ""}`}>
      {isCorrect ? (
        <>
          <h1>You Win!</h1>
          <hr />
          <p>
            You found the solution in {attemptNo}{" "}
            {attemptNo === 1 ? "guess" : "guesses"}.
          </p>
          <h2>{solution}</h2>
        </>
      ) : (
        <>
          <h1>You Lose.</h1>
          <hr />
          <p>The solution was:</p>
          <h2>{solution}</h2>
        </>
      )}
      <p>Want to play again?</p>
      <div className="modal-buttons">
        <NewGameButton gameMode="Wordl" />
        <NewGameButton gameMode="Wordle" />
        <NewGameButton gameMode="Wordlee" />
      </div>
    </div>
  );
};

const NewGameButton = ({ gameMode }) => {
  return <button className="new-game-button">{gameMode}</button>;
};

export default Modal;
