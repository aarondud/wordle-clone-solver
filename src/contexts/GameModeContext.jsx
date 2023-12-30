import React, { createContext, useState, useEffect } from "react";
import { fetchAllData } from "../utils/dataFetcher.js";
import useWordle from "../hooks/useWordle.jsx";

const GameModeContext = createContext({
  gameMode: null,
  wordLength: null,
  validGuesses: null,
  solution: null,
  toggleGameMode: () => {},
  setGameMode: () => {},
  setWordLength: () => {},
});

const GameModeProvider = ({ children }) => {
  const [gameMode, setGameMode] = useState("Wordle");
  const [wordLength, setWordLength] = useState(5);
  const [gameData, setGameData] = useState(null);
  const [validGuesses, setValidGuesses] = useState(null);
  const [solution, setSolution] = useState(null);

  const { newGame, isCorrect } = useWordle();

  useEffect(() => {
    // load data
    const fetchGameData = async () => {
      try {
        const fetchedGameData = await fetchAllData();
        if (fetchedGameData) {
          setGameData(fetchedGameData);
        }
      } catch (error) {
        console.error("fetchAndUpdataData Error:", error);
      }
    };
    fetchGameData();
  }, []);

  useEffect(() => {
    // when data is loaded, set wordLength, validGuesses, and solution
    switchGameMode(gameMode);
  }, [gameData]);

  const switchGameMode = (newGameMode) => {
    if (gameData) {
      setWordLength(gameData[newGameMode].wordLength);
      setValidGuesses(gameData[newGameMode].validGuesses);
      setSolution(gameData[newGameMode].solution);
    } else {
      console.warn(`Game mode data not available for "${newGameMode}"`);
    }
  };

  const toggleGameMode = (newGameMode) => {
    newGame(newGameMode);
    setGameMode(newGameMode);
    switchGameMode(newGameMode);
  };

  return (
    <GameModeContext.Provider
      value={{
        gameMode,
        wordLength,
        maxAttempts: 6,
        validGuesses,
        solution,
        toggleGameMode,
        setGameMode,
        setWordLength,
      }}
    >
      {children}
    </GameModeContext.Provider>
  );
};

export { GameModeContext, GameModeProvider };
