import React from "react";

export default function Keypad({ usedKeys, handleKeyUp }) {
  const keyboardLayout = [
    "qwertyuiopasdfghjkl".split(""),
    "ENTER",
    "zxcvbnm".split(""),
    "⌫",
  ];

  const selectKey = (letter) => {
    handleKeyUp({ key: letter });
  };

  return (
    <div className="keypad" style={{ userSelect: "none" }}>
      {" "}
      {usedKeys &&
        keyboardLayout[0].map((letter) => {
          const color = usedKeys[letter];
          return (
            <div
              className={color}
              key={letter}
              onClick={() => selectKey(letter)}
            >
              {letter.toLocaleUpperCase()}
            </div>
          );
        })}
      <div id="big" onClick={() => selectKey("Enter")}>
        {keyboardLayout[1]}
      </div>
      {usedKeys &&
        keyboardLayout[2].map((letter) => {
          const color = usedKeys[letter];
          return (
            <div
              className={color}
              key={letter}
              onClick={() => selectLetter(letter)}
            >
              {letter.toLocaleUpperCase()}
            </div>
          );
        })}
      <div id="big" onClick={() => selectKey("Backspace")}>
        {keyboardLayout[3]}
      </div>
    </div>
  );
}
