import React, { useState, useEffect } from "react";

export default function Keypad() {
  const [letters, setLetters] = useState(null);

  return (
    <div className="keypad">
      {letters &&
        letters.map((letter) => {
          return <div key={letter.key}>{letter.key}</div>;
        })}
    </div>
  );
}
