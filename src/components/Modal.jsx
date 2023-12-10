import React from "react";

export default function Modal({ isCorrect, attemptNo, solution }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className="solution">{solution}</p>
          <p>You found the solution in {attemptNo} guesses</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>You Lose</h1>
          <p className="solution">{solution}</p>
          <p>Refresh page to try again</p>
        </div>
      )}
    </div>
  );
}
