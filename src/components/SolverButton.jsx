import { ThemeContext } from "@emotion/react";
import React, { useContext } from "react";
import { GameModeContext } from "../contexts/GameModeContext";
import OptimisedBruteForceSolver from "../solvers/OptimisedBruteForceSolver";
import useOptimisedBruteForceSolver from "../solvers/useOptimisedBruteForceSolver";

export default function SolverButton() {
  const { darkTheme } = useContext(ThemeContext);
  const {
    gameMode,
    wordLength,
    validGuesses,
    guesses,
    attemptNo,
    isCorrect,
    handleKeyUp,
    solverOn,
    setSolverOn,
    toggleSolver,
    resetBoard,
  } = useContext(GameModeContext);

  const { runOBFSolver } = useOptimisedBruteForceSolver();

  /*
  const runSolversClasses = () => {
    // TODO store solvers in array
    // TODO add css depending on solver running

    const solver = new OptimisedBruteForceSolver(
      gameMode,
      wordLength,
      validGuesses,
      handleKeyUp
    );
    setSolverOn(true);
    solver.runSolver();

    useEffect(() => {
      solver.updateGameState(guesses, attemptNo, isCorrect);
    }, [guesses, attemptNo, isCorrect]);
  };
  */

  const runSolversHooks = () => {
    toggleSolver();

    resetBoard();

    runOBFSolver();
  };

  return (
    <div
      className={`solver ${darkTheme ? "dark" : ""}`}
      onClick={solverOn ? null : runSolversHooks}
    >
      SOLVER
    </div>
  );
}
