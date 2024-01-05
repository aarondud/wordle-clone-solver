import React, { useContext } from "react";
import Tile from "./Tile.jsx";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import { GameModeContext } from "../../contexts/GameModeContext.jsx";

export default function Row({ guess, currentGuess, isInvalid, correct }) {
  const { darkTheme } = useContext(ThemeContext);
  const { wordLength } = useContext(GameModeContext);

  if (guess) {
    //past guess
    return (
      <div className={`row past ${darkTheme ? "dark" : ""}`}>
        {guess.map((letter, index) => (
          <Tile
            key={index}
            past
            color={!correct ? letter.color : ""} // remove colour so flip animation not triggered on win
            letter={letter.key}
            correct={correct}
          />
        ))}
      </div>
    );
  }

  if (currentGuess) {
    // current guess
    let letters = currentGuess.split("");
    return (
      <div
        className={`row current ${isInvalid ? "invalidWord" : ""} ${
          darkTheme ? "dark" : ""
        }`}
      >
        {letters.map((letter, index) => (
          <Tile
            key={index}
            letter={letter}
            color={letter.color}
            filled
            isCurrent
          />
        ))}
        <EmptyTiles numberTiles={wordLength - letters.length} />
      </div>
    );
  }

  return (
    // remaining guesses
    <div className={`row ${darkTheme ? "dark" : ""}`}>
      <EmptyTiles numberTiles={wordLength} />
    </div>
  );
}

const EmptyTiles = ({ numberTiles }) => {
  return Array.from({ length: numberTiles }, (_, index) => (
    <Tile key={index} />
  ));
};
