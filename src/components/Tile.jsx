import React from "react";

const Tile = ({ letter, color, filled, past, isCurrent }) => (
  <div
    className={`tile ${filled ? "filled" : ""} ${past ? "past" : ""} ${
      color ? color : ""
    } ${isCurrent ? "current" : ""}`}
    key={letter}
  >
    {letter || ""}
  </div>
);

export default Tile;
