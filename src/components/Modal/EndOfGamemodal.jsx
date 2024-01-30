import React, { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameModeContext } from "../../contexts/GameModeContext";

const EndOfGameModal = ({ modalType, isModalVisible, exitModal }) => {
  const { darkTheme } = useContext(ThemeContext);
  const { solution, attemptNo } = useContext(GameModeContext);
  const solutionRef = useRef(null);
  const attemptNoRef = useRef(null);

  useEffect(() => {
    solutionRef.current = solution;
    attemptNoRef.current = attemptNo;
  }, []);

  const renderWinModal = () => {
    return (
      <>
        <h1>You Win!</h1>
        <hr />
        <p>
          Congratulations! You found the solution in {attemptNoRef.current}{" "}
          {attemptNoRef.current === 1 ? "guess" : "guesses"} 🕵️‍♀️. You're a natural.
        </p>
        <h2>{solutionRef.current}</h2>
      </>
    );
  };

  const renderLoseModal = () => {
    return (
      <>
        <h1>You Lose.</h1>
        <hr />
        <p>Oops! It looks like you didn't crack the case this time 🕵️‍♀️. The solution was:</p>
        <h2>{solutionRef.current}</h2>
      </>
    );
  };

  return (
    <div
      className={`modal-content ${modalType} ${
        isModalVisible ? "visible" : ""
      } ${darkTheme ? "dark" : ""}`}
    >
      {modalType === "win" ? renderWinModal() : null}
      {modalType === "lose" ? renderLoseModal() : null}

      <p>Ready for another round 🤔?</p>
      <div className="modal-buttons">
        <NewGameButton gameMode="Wordl" exitModal={exitModal} />
        <NewGameButton gameMode="Wordle" exitModal={exitModal} />
        <NewGameButton gameMode="Wordlee" exitModal={exitModal} />
      </div>
    </div>
  );
};
const NewGameButton = ({ gameMode, exitModal }) => {
  const { newGame } = useContext(GameModeContext);
  const { darkTheme } = useContext(ThemeContext);

  return (
    <button
      className={`new-game-button ${darkTheme ? "dark" : ""}`}
      onClick={() => {
        newGame(gameMode);
        exitModal();
      }}
    >
      {gameMode}
    </button>
  );
};

export default EndOfGameModal;
