import { useState } from "react";

const useWordle = (solution) => {
  const wordLength = 5;
  const maxAttempts = 6;

  const [attemptNo, setAttemptNo] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(maxAttempts)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((letter) => ({
      key: letter,
      color: "grey",
    }));

    // find green
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

    setCurrentGuess("");
  };

  const handleKeyUp = ({ key }) => {
    if (key === "Enter") {
      // no duplicate word
      // attempt < 5
      // currentGuess = 5 characters

      if (
        attemptNo < maxAttempts &&
        currentGuess.length == wordLength &&
        !history.includes(currentGuess)
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

  return { attemptNo, currentGuess, guesses, isCorrect, handleKeyUp };
};

export default useWordle;
