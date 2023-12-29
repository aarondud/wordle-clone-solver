import React, { createContext, useState, useMemo, useEffect } from "react";
import { fetchData } from "../utils/dataFetcher.js";
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

const GameModeProvider = React.memo(({ children }) => {
  const gameModes = {
    Wordl: 4,
    Wordle: 5,
    Wordlee: 6,
  };

  const [gameMode, setGameMode] = useState("Wordle");
  const [wordLength, setWordLength] = useState(gameModes["Wordle"]);
  const [solution, setSolution] = useState(null);
  const [validGuesses, setValidGuesses] = useState(null);
  const { newGame } = useWordle();

  /*
  const [validGuesses, setValidGuesses] = useState(() => {
    fetchData(gameMode).then((data) => {
      if (data) {
        return data.words;
      }
    });
  });
  const [solution, setSolution] = useState(() => {
    fetchData(gameMode).then((data) => {
      if (data) {
        console.log("initial solution", data.solution);
        return data.solution;
      }
    });
  });
  */

  useEffect(() => {
    //console.log("Fetching data...");
    fetchData(gameMode).then((data) => {
      if (data) {
        setValidGuesses(data.words);
        setSolution(data.solution);
        console.log("solution", data.solution);
        console.log("solution", data.solution);
        console.log("Post-fetch state:");
        console.log("gameMode:", gameMode);
        console.log("wordLength:", wordLength);
      }
    });
  }, [gameMode]);
  //}, [resetGameFlag **OR** gameMode, wordLength]); // TODO need to rerun - even when

  const toggleGameMode = (newGameMode) => {
    newGame(newGameMode);
    setGameMode(newGameMode);
    setWordLength(gameModes[newGameMode]);
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
});

export { GameModeContext, GameModeProvider };
