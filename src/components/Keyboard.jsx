import React from "react";

export default function Keypad({ usedKeys }) {
  const keyboardLayout = [
    "qwertyuiopasdfghjkl".split(""),
    "ENTER",
    "zxcvbnm".split(""),
    "⌫",
  ];

  return (
    <div className="keypad">
      {usedKeys &&
        keyboardLayout[0].map((letter) => {
          const color = usedKeys[letter];
          return (
            <div className={color} key={letter}>
              {letter.toLocaleUpperCase()}
            </div>
          );
        })}
      <div id="big">{keyboardLayout[1]}</div>
      {usedKeys &&
        keyboardLayout[2].map((letter) => {
          const color = usedKeys[letter];
          return (
            <div className={color} key={letter}>
              {letter.toLocaleUpperCase()}
            </div>
          );
        })}
      <div id="big">{keyboardLayout[3]}</div>
    </div>
  );
}
