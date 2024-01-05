import React, { useContext } from "react";
import Key from "./Key";
import { GameModeContext } from "../../contexts/GameModeContext";

export default function Keyboard() {
  const { usedKeys, handleKeyUp } = useContext(GameModeContext);
  const keyboardLayout = [
    "qwertyuiopasdfghjkl".split(""),
    ["Enter"],
    "zxcvbnm".split(""),
    ["⌫"],
  ];

  const renderKeyRow = (row, rowIndex) =>
    row.map((letter, keyIndex) => (
      <Key
        key={`${rowIndex}-${keyIndex}`}
        letter={letter}
        color={usedKeys[letter]}
        onClick={() => handleKeyUp({ key: letter })}
      />
    ));

  return <div className="keyboard">{keyboardLayout.map(renderKeyRow)}</div>;
}
