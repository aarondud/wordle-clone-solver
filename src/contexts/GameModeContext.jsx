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
  toggleSolver: () => {},
  resetBoard: () => {},
  solverOn: null,
  setSolverOn: () => {},
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

  const [solverOn, setSolverOn] = useState(false);
  // need to increase the size of guesses if go over - added push() functionality
  // need to avoid the maxAttempts attemptNo setting to false - checkGameOver
  // need to set the onscreen guess rendering using module -

  const checkGameOver = () => {
    if (solverOn) {
      return false;
    }

    return attemptNo >= maxAttempts;
  };

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((letter) => ({
      key: letter,
      color: "grey",
    }));

    formattedGuess.forEach((letter, i) => {
      if (letter.key === solutionArray[i]) {
        letter.color = "green";
        solutionArray[i] = null; //cross out green here so yellow doesnt double
      }
    });

    formattedGuess.forEach((letter) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        letter.color = "yellow";
        solutionArray[solutionArray.indexOf[letter.key]] = null; //cross out so doesnt double
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

      if (checkGameOver()) {
        newGuesses.push(formattedGuess);
      } else {
        newGuesses[attemptNo] = formattedGuess;
      }

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
    if (isCorrect || checkGameOver()) {
      return;
    }

    if (key === "Enter") {
      if (
        // (attemptNo < maxAttempts || solverOn) && // solverOn change here
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

  const toggleSolver = () => {
    setSolverOn(!solverOn);
  };

  const newGame = async (newGameMode) => {
    const gameData = await fetchGameData(newGameMode);

    // reset game
    resetBoard();

    // toggle game mdoe
    setGameMode(newGameMode);

    // switch game mode
    setWordLength(gameData.wordLength);
    setValidGuesses(gameData.validGuesses);
    setSolution(gameData.solution);

    // solver mode
    setSolverOn(false);
  };

  const resetBoard = () => {
    setAttemptNo(0);
    setCurrentGuess("");
    setGuesses([...Array(maxAttempts)]);
    setHistory([]);
    setIsCorrect(false);
    setUsedKeys({});
    setIsInvalid(null);
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
        solverOn,
        toggleSolver,
        setSolverOn,
        resetBoard,
      }}
    >
      {children}
    </GameModeContext.Provider>
  );
};

export { GameModeContext, GameModeProvider };
