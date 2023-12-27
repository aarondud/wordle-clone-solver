import useWordle from "../../hooks/useWordle";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameModeContext } from "../../contexts/GameModeContext";

const EndOfGameModal = ({ modalType, isModalVisible, setIsModalVisible }) => {
  const { darkTheme } = useContext(ThemeContext);
  const { solution } = useContext(GameModeContext);
  const attemptNo = "placeholder"; // TODO this should be in game context

  return (
    <div
      className={`modal-content ${isModalVisible ? "visible" : ""} ${
        darkTheme ? "dark" : ""
      }`}
    >
      {modalType === "win" && (
        <>
          <h1>You Win!</h1>
          <hr />
          <p>
            You found the solution in {attemptNo}{" "}
            {attemptNo === 1 ? "guess" : "guesses"}.
          </p>
          <h2>{solution}</h2>
        </>
      )}
      {modalType === "lose" && (
        <>
          <h1>You Lose.</h1>
          <hr />
          <p>The solution was:</p>
          <h2>{solution}</h2>
        </>
      )}
      <p>Want to play again?</p>
      <div className="modal-buttons">
        <NewGameButton gameMode="Wordl" setIsModalVisible={setIsModalVisible} />
        <NewGameButton
          gameMode="Wordle"
          setIsModalVisible={setIsModalVisible}
        />
        <NewGameButton
          gameMode="Wordlee"
          setIsModalVisible={setIsModalVisible}
        />
      </div>
    </div>
  );
};

const NewGameButton = ({ gameMode, setIsModalVisible }) => {
  const { newGame } = useWordle();
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
