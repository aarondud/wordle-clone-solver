import React, { useContext } from "react";
import Row from "./Row";
import { ThemeContext } from "../../contexts/ThemeContext";
import InvalidPopup from "./InvalidPopup";

export default function Grid({ guesses, currentGuess, attemptNo, isInvalid }) {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`grid ${darkTheme ? "dark" : ""}`}>
      {guesses.map((guess, index) => {
        if (attemptNo === index) {
          return (
            <Row
              key={index}
              currentGuess={currentGuess}
              isInvalid={isInvalid}
            />
          );
        }
        return <Row key={index} guess={guess} />;
      })}
      {isInvalid && <InvalidPopup visible={isInvalid} />}
    </div>
  );
}
