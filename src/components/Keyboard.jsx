import React from "react";

export default function Keypad({ usedKeys }) {
  const chars = "qwertyuiopasdfghjklzxcvbnm".split("");

  return (
    <div className="keypad">
      {chars &&
        chars.map((letter) => {
          const color = usedKeys[letter];
          return (
            <div className={color} key={letter}>
              {letter.toLocaleUpperCase()}
            </div>
          );
        })}
    </div>
  );
}
