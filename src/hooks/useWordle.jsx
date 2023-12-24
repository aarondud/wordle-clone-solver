import { useContext, useState } from "react";
import { GameModeContext } from "../contexts/GameModeContext";

const useWordle = () => {
  const { solution, validGuesses, wordLength, maxAttempts } =
    useContext(GameModeContext);
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

  return {
    attemptNo,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyUp,
    isInvalid,
  };
};

export default useWordle;

/*
BEFORE TRACKING ISINVALID
const handleKeyUp = ({ key }) => {
    if (key === "Enter") {
      if (
        attemptNo < maxAttempts &&
        currentGuess.length == wordLength &&
        !history.includes(currentGuess) &&
        validGuesses.has(currentGuess)
      ) {
        addNewGuess(formatGuess());
      }
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < wordLength) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };
  */
