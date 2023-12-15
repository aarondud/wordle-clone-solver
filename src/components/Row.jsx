import { useEffect } from "react";
import React from "react";
import Tile from "./Tile.jsx";

export default function Row({ wordLength, guess, currentGuess, isInvalid }) {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((letter, index) => (
          <Tile key={index} color={letter.color} letter={letter.key} />
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <div className={`row current ${isInvalid ? "invalidWord" : ""}`}>
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
    <div className="row">
      {Array.from({ length: wordLength }, (_, index) => (
        <Tile key={index} />
      ))}
    </div>
  );
}
