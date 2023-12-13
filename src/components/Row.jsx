import { useEffect } from "react";
import React from "react";

export default function Row({ wordLength, guess, currentGuess, isInvalid }) {
  // useEffect for the shake animation
  useEffect(() => {
    if (isInvalid) {
      const element = document.querySelector(".row.current.invalidWord");
      element.classList.add("shake-animation");

      // Remove the shake class after the animation ends
      const onAnimationEnd = () => {
        element.classList.remove("shake-animation");
        element.removeEventListener("animationend", onAnimationEnd);
      };

      // Attach event listener for animation end
      element.addEventListener("animationend", onAnimationEnd);
    }
  }, [isInvalid]);

  if (guess) {
    return (
      <div className="row past">
        {guess.map((letter, index) => (
          <div key={index} className={letter.color}>
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <div className={`row current ${isInvalid ? "invalidWord" : ""}`}>
        {letters.map((letter, index) => (
          <div key={index} className="filled">
            {letter}
          </div>
        ))}
        {[...Array(wordLength - letters.length)].map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      {Array.from({ length: wordLength }, (_, index) => (
        <div key={index} className="letter"></div>
      ))}
    </div>
  );
}
