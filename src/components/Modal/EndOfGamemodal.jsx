import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameModeContext } from "../../contexts/GameModeContext";

const EndOfGameModal = ({
  modalType,
  isModalVisible,
  setIsModalVisible,
  handleNewGame,
}) => {
  const { darkTheme } = useContext(ThemeContext);
  const { solution, attemptNo } = useContext(GameModeContext);

  const renderWinModal = () => {
    return (
      <>
        <h1>You Win!</h1>
        <hr />
        <p>
          You found the solution in {attemptNo}{" "}
          {attemptNo === 1 ? "guess" : "guesses"}.
        </p>
        <h2>{solution}</h2>
      </>
    );
  };

  const renderLoseModal = () => {
    return (
      <>
        <h1>You Lose.</h1>
        <hr />
        <p>The solution was:</p>
        <h2>{solution}</h2>
      </>
    );
  };

  return (
    <div
      className={`modal-content end-of-game ${
        isModalVisible ? "visible" : ""
      } ${darkTheme ? "dark" : ""}`}
    >
      {modalType === "win" ? renderWinModal() : null}
      {modalType === "lose" ? renderLoseModal() : null}

      <p>Want to play again?</p>
      <div className="modal-buttons">
        <NewGameButton
          gameMode="Wordl"
          setIsModalVisible={setIsModalVisible}
          handleNewGame={handleNewGame}
        />
        <NewGameButton
          gameMode="Wordle"
          setIsModalVisible={setIsModalVisible}
          handleNewGame={handleNewGame}
        />
        <NewGameButton
          gameMode="Wordlee"
          setIsModalVisible={setIsModalVisible}
          handleNewGame={handleNewGame}
        />
      </div>
    </div>
  );
};
const NewGameButton = ({ gameMode, setIsModalVisible, handleNewGame }) => {
  const { newGame } = useContext(GameModeContext);

  return (
    <button
      className="new-game-button"
      onClick={() => {
        setIsModalVisible(false);
        newGame(gameMode);
      }}
    >
      {gameMode}
    </button>
  );
};

export default EndOfGameModal;
