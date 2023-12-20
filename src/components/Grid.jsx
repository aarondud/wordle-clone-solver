import React from "react";
import Row from "./Row";

export default function Grid({
  guesses,
  currentGuess,
  attemptNo,
  wordLength,
  isInvalid,
}) {
  return (
    <div className="grid">
      {guesses.map((guess, index) => {
        if (attemptNo === index) {
          return (
            <Row
              key={index}
              wordLength={wordLength}
              currentGuess={currentGuess}
              isInvalid={isInvalid}
            />
          );
        }
        return <Row key={index} wordLength={wordLength} guess={guess} />;
      })}
    </div>
  );
}
