import "./App.css";
import Wordle from "./components/Wordle.jsx";
import Navbar from "./components/Navbar.jsx";
import { useEffect, useState } from "react";
import { fetchData } from "./utils/dataFetcher.js";

function App() {
  const [words, setWords] = useState(null);
  const [solution, setSolution] = useState(null);
  const [gameMode, setGameMode] = useState("Wordle");
  const [wordLength, setWordLength] = useState(5);
  const [maxAttempts, setMaxAttempts] = useState(6);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchData(gameMode).then((data) => {
      if (data) {
        setWords(data.words);
        setSolution(data.solution);
      }
    });
  }, [gameMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleGameMode = () => {
    setGameMode((prevMode) => (prevMode === "Wordle" ? "Wordle+" : "Wordle"));
    setWordLength((prevMode) => (prevMode === 5 ? 6 : 5));
    setMaxAttempts((prevMode) => (prevMode === 6 ? 7 : 6));
  };

  const toggleInfo = () => {};

  return (
    <div className="App">
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        gameMode={gameMode}
        toggleGameMode={toggleGameMode}
        toggleInfo={toggleInfo}
      />
      {words && solution && (
        <Wordle
          className={darkMode ? "dark" : ""}
          solution={solution}
          validGuesses={words}
          wordLength={wordLength}
          maxAttempts={maxAttempts}
        />
      )}
    </div>
  );
}

export default App;
