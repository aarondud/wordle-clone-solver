import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameModeContext } from "../../contexts/GameModeContext";

const EndOfGameModal = ({ modalType }) => {
  const { darkTheme } = useContext(ThemeContext);
  const { solution } = useContext(GameModeContext);
  const attemptNo = "placeholder";

  return (
    <div className={`modal-content ${darkTheme ? "dark" : ""}`}>
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

export default EndOfGameModal;
