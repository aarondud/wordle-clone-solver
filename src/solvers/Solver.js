import { GameModeContext } from "../contexts/GameModeContext";
import { useContext } from "react";
// maybe need to pass in methods through constructor, idk
// guesses, attemptNo, handleKeyup, isCorrect
// but does this mean they will be static? i need them to be reponsive

class Solver {
  constructor(
    gameMode,
    wordLength,
    validGuesses,
    guesses,
    attemptNo,
    isCorrect,
    handleKeyUp
  ) {
    this.gameMode = gameMode;
    this.wordLength = wordLength;
    this.validGuesses = validGuesses;
    //this.attemptNo = 0; // or does it start at one
    this.guesses = guesses;
    this.attemptNo = attemptNo;
    this.isCorrect = isCorrect;
    //this.handleKeyUp = handleKeyUp;
    //this.handleKeyUp = (key) => handleKeyUp(key);
    console.log(handleKeyUp);
    this.handleKeyUp = handleKeyUp.bind(this);

    // const { guesses, attemptNo, isCorrect } = useContext(GameModeContext);
    // this.guesses = guesses;
    // this.attemptNo = attemptNo;
    // this.isCorrect = isCorrect;
    // bard says these will update... i doubt it
  }

  firstGuess = "slate";

  updateGameState(guesses, attemptNo, isCorrect) {
    this.guesses = guesses;
    this.attemptNo = attemptNo;
    this.isCorrect = isCorrect;
  }

  incrementAttemptNo() {
    this.attemptNo += 1;
  }

  selectNextGuess() {}

  removeGuessfromRemainingGuesses(guess) {
    this.validGuesses.delete(guess);
  }

  makeAttempt(guess) {
    // convert string to array
    // map array, apply handleKeyUp
    // finish with "Enter" key

    const guessArray = [...guess, "Enter"];

    guessArray.forEach((letter) => {
      this.handleKeyUp({ key: letter });
      // idk if this is how to access the function
      // maybe instead pass the function into the constructor
    });
  }

  getFeedback() {
    // get guesses from GameModeContext
    // using attemptNo, acess previous guess (need to work out how attempt no works, ie is it -1 or no)

    return this.guesses[this.attemptNo - 1];
    // each letter has an attached colour
    // returns array of elements in this form {key: letter, color: "____",
  }

  updateRemainingGuesses() {}

  runSolver() {
    while (!this.isCorrect) {
      const nextGuess = this.selectNextGuess();
      this.makeAttempt(nextGuess);
      this.removeGuessfromRemainingGuesses(nextGuess);
      this.incrementAttemptNo();
      const feedback = this.getFeedback();

      if (this.isCorrect) {
        // or, can check if all feedback is green
        break;
      }

      this.validGuesses = this.updateRemainingGuesses(feedback);
    }
  }
}

export default Solver;
