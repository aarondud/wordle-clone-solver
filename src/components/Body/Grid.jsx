import React, { useContext } from "react";
import Row from "./Row";
import { ThemeContext } from "../../contexts/ThemeContext";
import InvalidPopup from "./InvalidPopup";
import { GameModeContext } from "../../contexts/GameModeContext";

export default function Grid() {
  const { darkTheme } = useContext(ThemeContext);
  const { guesses, currentGuess, attemptNo, isInvalid, isCorrect } =
    useContext(GameModeContext);

  return (
    <div className={`grid ${darkTheme ? "dark" : ""}`}>
      {guesses.map((guess, index) => {
        // current row
        if (attemptNo === index) {
          return (
            <Row
              key={index}
              currentGuess={currentGuess}
              isInvalid={isInvalid}
            />
          );
        }

        // winning row
        if (isCorrect && attemptNo === index + 1) {
          return <Row key={index} guess={guess} correct={isCorrect} />;
        }

        // past row & empty row
        return <Row key={index} guess={guess} />;
      })}
      {isInvalid && <InvalidPopup />}
    </div>
  );
}
