import React from "react";

const Tile = ({ letter, color, filled, isCurrent }) => (
  <div
    className={`tile ${filled ? "filled" : ""} ${color ? color : ""} ${
      isCurrent ? "current" : ""
    }`}
    key={letter}
  >
    {letter || ""}
  </div>
);

export default Tile;
