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
