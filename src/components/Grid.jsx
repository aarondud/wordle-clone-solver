import React from "react";
import Row from "./Row";

export default function Grid({ guesses, currentGuess, attemptNo }) {
  return (
    <div>
      {guesses.map((guess, index) => {
        if (attemptNo === index) {
          return <Row key={index} currentGuess={currentGuess} />;
        }
        return <Row key={index} guess={guess} />;
      })}
    </div>
  );
}
