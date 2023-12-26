import React, { useContext } from "react";
import Tile from "./Tile.jsx";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import { GameModeContext } from "../../contexts/GameModeContext.jsx";

export default function Row({ guess, currentGuess, isInvalid }) {
  const { darkTheme } = useContext(ThemeContext);
  const { wordLength } = useContext(GameModeContext);

  if (guess) {
    return (
      <div className={`row past ${darkTheme ? "dark" : ""}`}>
        {guess.map((letter, index) => (
          <Tile key={index} past color={letter.color} letter={letter.key} />
        ))}
      </div>
    );
  }

  if (currentGuess) {
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
        {[...Array(wordLength - letters.length)].map((_, index) => (
          <Tile key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={`row ${darkTheme ? "dark" : ""}`}>
      {Array.from({ length: wordLength }, (_, index) => (
        <Tile key={index} />
      ))}
    </div>
  );
}