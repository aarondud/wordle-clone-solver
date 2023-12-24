import React, { createContext, useState, useEffect } from "react";
import { fetchData } from "../utils/dataFetcher.js";

const GameModeContext = createContext({
  gameMode: null,
  wordLength: null,
  validGuesses: null,
  solution: null,
  toggleGameMode: () => {},
});

const GameModeProvider = ({ children }) => {
  const [gameMode, setGameMode] = useState("Wordle");
  const [wordLength, setWordLength] = useState(5);
  const [validGuesses, setValidGuesses] = useState(null);
  const [solution, setSolution] = useState(null);

  const gameModes = {
    Wordl: 4,
    Wordle: 5,
    Wordlee: 6,
  };

  useEffect(() => {
    fetchData(gameMode).then((data) => {
      if (data) {
        setValidGuesses(data.words);
        setSolution(data.solution);
        console.log("solution", data.solution);
      }
    });
  }, [gameMode]);

  const toggleGameMode = (newGameMode) =>
    setGameMode((prev) => {
      if (prev !== newGameMode) {
        setWordLength(gameModes[newGameMode]);
        return newGameMode;
      }
    });

  return (
    <GameModeContext.Provider
      value={{
        gameMode,
        wordLength,
        maxAttempts: 6,
        validGuesses,
        solution,
        toggleGameMode,
      }}
    >
      {children}
    </GameModeContext.Provider>
  );
};

export { GameModeContext, GameModeProvider };
