import React from "react";
import Key from "./Key";

export default function Keyboard({ usedKeys, handleKeyUp }) {
  const keyboardLayout = [
    "qwertyuiopasdfghjkl".split(""),
    ["Enter"],
    "zxcvbnm".split(""),
    ["⌫"],
  ];

  const renderRow = (row, rowIndex) =>
    row.map((letter, keyIndex) => (
      <Key
        key={`${rowIndex}-${keyIndex}`}
        letter={letter}
        color={usedKeys[letter]}
        onClick={() => handleKeyUp({ key: letter })}
      />
    ));

  return (
    <div className="keyboard">
      {keyboardLayout.map((row, rowIndex) => renderRow(row, rowIndex))}
    </div>
  );
}
/*



  return (
    <div className="keyboard" style={{ userSelect: "none" }}>
      {" "}
      {usedKeys &&
        keyboardLayout[0].map((letter) => {
          <Key key={letter} letter={letter} color={usedKeys[letter]} />;
        })}
      <div
        className="hover-clickable"
        id="big"
        onClick={() => selectKey("Enter")}
      >
        {keyboardLayout[1]}
      </div>
      {usedKeys &&
        keyboardLayout[2].map((letter) => {
          const color = usedKeys[letter];
          return (
            <div
              className={`${color} hover-clickable`}
              key={letter}
              onClick={() => selectLetter(letter)}
            >
              {letter.toLocaleUpperCase()}
            </div>
          );
        })}
      <div
        className="hover-clickable"
        id="big"
        onClick={() => selectKey("Backspace")}
      >
        {keyboardLayout[3]}
      </div>
    </div>
  );
}
*/
