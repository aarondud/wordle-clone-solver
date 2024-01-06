import React, { createContext, useState, useEffect } from "react";
import { fetchData } from "../utils/dataFetcher.js";

const GameModeContext = createContext({
  gameMode: null,
  wordLength: null,
  validGuesses: null,
  solution: null,
  attemptNo: null,
  currentGuess: null,
  guesses: null,
  isCorrect: null,
  usedKeys: null,
  isInvalid: null,
  setGameMode: () => {},
  setWordLength: () => {},
  handleKeyUp: () => {},
  newGame: () => {},
});

const maxAttempts = 6;

const GameModeProvider = ({ children }) => {
  const [gameMode, setGameMode] = useState("Wordle");
  const [wordLength, setWordLength] = useState(5);
  const [validGuesses, setValidGuesses] = useState(null);
  const [solution, setSolution] = useState(null);
  const [attemptNo, setAttemptNo] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(maxAttempts)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});
  const [isInvalid, setIsInvalid] = useState(null);

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((letter) => ({
      key: letter,
      color: "grey",
    }));

    // find greens
    formattedGuess.forEach((letter, i) => {
      if (letter.key === solutionArray[i]) {
        letter.color = "green"; // different
        solutionArray[i] = null; //crossing out green here so yellow doesnt double
      }
    });

    // find yellow
    // TODO doubles of single letter still both yellow
    formattedGuess.forEach((letter) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        letter.color = "yellow";
        solutionArray[solutionArray.indexOf[letter.key]] = null; //crossing out here so yellow doesnt double
      }
    });
    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[attemptNo] = formattedGuess;
      return newGuesses;
    });

    setHistory((prevHistory) => [...prevHistory, currentGuess]);

    setAttemptNo((attemptNo) => attemptNo + 1);

    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };

      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.key];

        if (letter.color === "green") {
          newKeys[letter.key] = "green";
          return;
        }
        if (letter.color === "yellow" && currentColor !== "green") {
          newKeys[letter.key] = "yellow";
          return;
        }
        if (
          letter.color === "grey" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          newKeys[letter.key] = "grey";
          return;
        }
      });
      return newKeys;
    });

    setCurrentGuess("");
  };

  const handleKeyUp = ({ key }) => {
    if (isCorrect || attemptNo >= maxAttempts) {
      return;
    }

    if (key === "Enter") {
      if (
        attemptNo < maxAttempts &&
        currentGuess.length == wordLength &&
        !history.includes(currentGuess)
      ) {
        if (validGuesses.has(currentGuess)) {
          setIsInvalid(false);
          addNewGuess(formatGuess());
        } else {
          setIsInvalid(true);
          setTimeout(() => setIsInvalid(false), 1000);
        }
      }
    }

    if (key === "Backspace" || key === "⌫") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      setIsInvalid(false);
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < wordLength) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  const fetchGameData = async (gameMode) => {
    try {
      return await fetchData(gameMode);
    } catch (error) {
      console.error("fetchAndUpdataData Error:", error);
    }
  };

  useEffect(() => {
    newGame("Wordle");
  }, []);

  const newGame = async (newGameMode) => {
    const gameData = await fetchGameData(newGameMode);

    // toggle game mdoe
    setGameMode(newGameMode);

    // reset game
    setAttemptNo(0);
    setCurrentGuess("");
    setGuesses([...Array(maxAttempts)]);
    setHistory([]);
    setIsCorrect(false);
    setUsedKeys({});
    setIsInvalid(null);

    // switch game mode
    setWordLength(gameData.wordLength);
    setValidGuesses(gameData.validGuesses);
    setSolution(gameData.solution);
  };

  return (
    <GameModeContext.Provider
      value={{
        gameMode,
        wordLength,
        maxAttempts: maxAttempts,
        validGuesses,
        solution,
        attemptNo,
        currentGuess,
        guesses,
        isCorrect,
        usedKeys,
        isInvalid,
        handleKeyUp,
        newGame,
      }}
    >
      {children}
    </GameModeContext.Provider>
  );
};

export { GameModeContext, GameModeProvider };
