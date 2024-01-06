import { ThemeContext } from "@emotion/react";
import React, { useContext } from "react";

const runSolvers = () => {
  //placeholder
};

export default function SolverButton() {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`solver ${darkTheme ? "dark" : ""}`} onClick={runSolvers}>
      SOLVER
    </div>
  );
}
