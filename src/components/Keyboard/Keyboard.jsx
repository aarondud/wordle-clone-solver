import React, { useContext } from "react";
import Key from "./Key";
import { GameModeContext } from "../../contexts/GameModeContext";

export default function Keyboard() {
  const { usedKeys, handleKeyUp, solverOn } = useContext(GameModeContext);
  const keyboardLayout = [
    "qwertyuiop".split(""),
    "asdfghjkl".split(""),
    ["Enter"],
    "zxcvbnm".split(""),
    ["⌫"],
  ];

  const renderKeyRow = (row, rowIndex) => (
    <div className={`keyboard-row-${rowIndex}`} key={rowIndex}>
      {row.map((letter, keyIndex) => (
        <Key
          className={`row-${rowIndex}`}
          key={`${rowIndex}-${keyIndex}`}
          letter={letter}
          color={usedKeys[letter]}
          onClick={() => (solverOn ? null : handleKeyUp({ key: letter }))}
        />
      ))}
    </div>
  );

  return <div className="keyboard">{keyboardLayout.map(renderKeyRow)}</div>;
}
