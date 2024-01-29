import React, { useContext, useEffect, useState } from "react";
import { GameModeContext } from "../contexts/GameModeContext";

export default function useOptimisedBruteForceSolver() {
  const {
    gameMode,
    wordLength,
    validGuesses,
    guesses,
    attemptNo,
    isCorrect,
    handleKeyUp,
  } = useContext(GameModeContext);

  const [remainingGuesses, setRemainingGuesses] = useState(null);
  const firstGuess = "slate";

  useEffect(() => {
    if (validGuesses) {
      setRemainingGuesses([...validGuesses]);
      console.log(guesses);
    }
  }, [validGuesses]);

  const selectNextGuess = () => {
    if (attemptNo === 0) {
      return firstGuess;
    }
    return remainingGuesses[0];
  };

  const removeGuessFromRemainingGuesses = (guess) => {
    const updatedGuesses = remainingGuesses.filter((word) => word !== guess);
    setRemainingGuesses(updatedGuesses);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /*
  const makeAttempt = (guess) => {
    // convert string to array
    // map array, apply handleKeyUp
    // finish with "Enter" key
    const guessArray = [...guess, "Enter"];
    console.log("why isnt enter working", guessArray);

    guessArray.forEach((letter) => {
      setTimeout(() => handleKeyUp({ key: letter }), 5000);
    });

    handleKeyUp("Enter");
  };
  */

  const makeAttempt = async (guess) => {
    const guessArray = [...guess, "Enter"];
    console.log("why isnt enter working", guessArray);

    for (const letter of guessArray) {
      await delay(100);
      handleKeyUp({ key: letter });
    }

    handleKeyUp({ key: "Enter" });
    await delay(5000);
  };

  const getFeedback = () => {
    console.log("what is attempt no at get feedback", attemptNo);
    // get guesses from GameModeContext
    // using attemptNo, acess previous guess (need to work out how attempt no works, ie is it -1 or no)
    console.log(guesses);
    return guesses[attemptNo - 1];
    // each letter has an attached colour
    // returns array of elements {key: letter, color: "____"}
  };

  const updateRemainingGuesses = (guessFeedback) => {
    //guessFeedback {key: letter, color: "____",

    // still room to improve... if a letter is yellow and green, how should this handle
    // if have 2 yellows how should this handle
    // if a letter is green, and is also used somewhere else, this is grey yes?

    const updatedRemainingGuesses = remainingGuesses.filter((word) => {
      guessFeedback.map((feedback, index) => {
        const letter = feedback.key;
        const color = feedback.color;

        if (color === "green" && word[index] !== letter) {
          return false;
        }

        if (color === "grey" && word.includes(letter)) {
          return false;
        }

        if (color === "yellow" && !word.includes(letter)) {
          return false;
        }

        return true;
      });
    });
    return updatedRemainingGuesses;
  };

  const runOBFSolver = async () => {
    while (!isCorrect) {
      const nextGuess = selectNextGuess();
      await makeAttempt(nextGuess);

      removeGuessFromRemainingGuesses(nextGuess);

      // once guesses has been updated, execute getFeedback
      const feedback = getFeedback();

      if (isCorrect) {
        // or, can check if all feedback is green
        break;
      }

      // once feedback has been updated, execute updateRemainingGuesses
      const updatedRemainingGuesses = updateRemainingGuesses(feedback);

      // once updatedRemainingGuesses has been set, execute setRemainingGuesses
      setRemainingGuesses(updatedRemainingGuesses);
    }

    console.log("exit solver");
  };

  return { runOBFSolver };
}
