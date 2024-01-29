import Solver from "./Solver";

class OptimisedBruteForceSolver extends Solver {
  constructor(
    gameMode,
    wordLength,
    validGuesses,
    guesses,
    attemptNo,
    isCorrect,
    handleKeyUp
  ) {
    super(
      gameMode,
      wordLength,
      validGuesses,
      guesses,
      attemptNo,
      isCorrect,
      handleKeyUp
    );
  }

  selectNextGuess() {
    if (super.attemptNo === 0) {
      // or is this 1
      console.log("first guess, should be slate", super.firstGuess);
      return super.firstGuess;
    }

    const [first] = this.validGuesses; // 1st element of set
    return first;
  }

  updateRemainingGuesses(guessFeedback) {
    //guessFeedback {key: letter, color: "____",

    // still room to improve... if a letter is yellow and green, how should this handle
    // if have 2 yellows how should this handle
    // if a letter is green, and is also used somewhere else, this is grey yes?

    const remainingGuesses = this.validGuesses.filter((word) => {
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

      return remainingGuesses;
    });
  }
}

/*
  new
  
  
  
  
  
  old
  */

class old extends Solver {
  /**
   * Brute force approach. Script iteratively makes guesses and eliminates words from the potential set based on feedback until it finds the correct word.
   * Start with a set of potential words (e.g., all words of the same length).
   * After each guess, eliminate words from the set that do not match the feedback.
   * Repeat until the correct word is found.
   * This is more efficient than checking the entire dictionary each time.
   */

  matchesEvaluation(guess, evaluation) {
    for (let i = 0; i < guess.length; i++) {
      if (
        (evaluation[i] === Wordle.FEEDBACK.GREEN && guess[i] === guess[i]) ||
        (evaluation[i] === Wordle.FEEDBACK.GREY &&
          guess.includes(guess[i]) &&
          evaluation.indexOf(Wordle.FEEDBACK.GREEN) === -1) ||
        (evaluation[i] === Wordle.FEEDBACK.YELLOW && !guess.includes(guess[i]))
      ) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }

  makeAttempt(evaluation) {
    this.potentialAnswers = this.potentialAnswers.filter((word) =>
      this.matchesEvaluation(word, evaluation)
    );

    const nextAttempt = this.potentialAnswers[0];
    return nextAttempt;
  }

  evaluateAttempt(guess) {
    return Wordle.evaluateAttempt(guess);
  }

  solve() {
    let attempts = 0;
    let guess = this.potentialAnswers[0];
    while (this.potentialAnswers > 1) {
      guess = this.makeAttempt(this.evaluateAttempt(guess));
      console.log(`Attempt no: ${attempts}, Guess: ${guess}`);
      attempts++;
    }
  }
}

export default OptimisedBruteForceSolver;
