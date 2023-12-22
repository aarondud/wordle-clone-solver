import React, { useContext } from "react";
import Row from "./Row";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Grid({
  guesses,
  currentGuess,
  attemptNo,
  wordLength,
  isInvalid,
}) {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div className={`grid ${darkTheme ? "dark" : ""}`}>
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
