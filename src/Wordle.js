import * as utils from "./utils.mjs";
import { words } from "./words.mjs";

export class Attempt {
  constructor(guess, evaluation) {
    this.guess = guess;
    this.evaluation = evaluation;
  }
}

class Wordle {
  static GAME_STATUS = {
    ACTIVE: "active",
    WON: "won",
    LOST: "lost",
  };

  static FEEDBACK = {
    GREY: "grey",
    YELLOW: "yellow",
    GREEN: "green",
  };

  static GAME_MODE = {
    WORDLE: { mode: "Wordle", wordLength: 5, maxAttempts: 6 },
    WORDLE_PLUS: { mode: "Wordle+", maxAttempts: 7, wordLength: 6 },
  };

  // #targetWord;

  constructor(gameMode = Wordle.GAME_MODE.WORDLE) {
    this.gameMode = gameMode.mode;
    this.wordLength = gameMode.wordLength;
    this.maxAttempts = gameMode.maxAttempts;
    this.gameStatus = Wordle.GAME_STATUS.ACTIVE;
    this.targetWord = this.selectRandomWord();
    this.noAttempts = this.getNoAttempts();
    this.playerAttempts = this.resetAttempts();
  }

  selectRandomWord() {
    return words[Math.floor(Math.random() * words.length)].toLowerCase();
  }

  resetAttempts() {
    return [];
    /**
     * return Array.from(
      { length: this.getMaxAttempts() },
      () =>
        new Attempt({
          guess: Array(this.getWordLength()).fill(""),
          evaluation: Array(this.getWordLength()).fill(""),
        })
    );
     */
  }

  setAttempt(guess, evaluation) {
    this.attempt.push(new Attempt(guess, evaluation));
  }

  evaluateAttempt(guess) {
    if (!this.isValidGuess(guess)) {
      throw new Error("Invalid Guess");
    }

    const targetWord = this.getTargetWord();

    const evaluation = guess.map((guessChar, i) => {
      const targetChar = targetWord[i];

      if (guessChar === targetChar) {
        return Hint.GREEN;
      } else if (targetWord.includes(guessChar)) {
        return Hint.YELLOW;
      } else {
        return Hint.GREY;
      }
    });

    return evaluation;
  }

  isValidGuess(guess) {
    return (
      guess.length == this.getWordLength() &&
      utils.validCharacters(guess) &&
      utils.isAWord(guess)
    );
  }

  updateGameStatus() {
    evaluation = this.getLastAttempt().evaluation;

    if (evaluation.every((color) => color === Hint.GREEN)) {
      return this.playerWins();
    }
    if (this.getNoGuesses() >= this.getMaxAttempts) {
      return this.playerLoses();
    }
  }

  incrementAttempts() {
    this.noAttempts += 1;
  }

  playerWins() {
    this.gameStatus = this.GAME_STATUS.WON;
  }

  playerLoses() {
    this.gameStatus = this.GAME_STATUS.LOST;
  }

  getPlayerAttempts() {
    return this.playerAttempts;
  }

  addToAttempts(guess, evaluation) {
    this.getPlayerAttempts().push(new Attempt(guess, evaluation));
  }

  getNoAttempts() {
    return this.getPlayerAttempts.length;
  }

  getTargetWord() {
    return this.targetWord;
  }

  getGameStatus() {
    return this.gameStatus;
  }

  getMaxAttempts() {
    return this.maxAttempts;
  }

  getWordLength() {
    return this.wordLength;
  }

  receivePlayerGuess(guess) {
    return;
  }
}

export { Wordle };
