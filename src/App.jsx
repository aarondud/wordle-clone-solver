import Wordle from "./components/Wordle.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { useEffect, useState } from "react";
import { fetchData } from "./utils/dataFetcher.js";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

function App() {
  const [words, setWords] = useState(null);
  const [solution, setSolution] = useState(null);
  const [gameMode, setGameMode] = useState("Wordle");
  const [wordLength, setWordLength] = useState(5);
  const [maxAttempts, setMaxAttempts] = useState(6);

  useEffect(() => {
    fetchData(gameMode).then((data) => {
      if (data) {
        setWords(data.words);
        setSolution(data.solution);
        console.log("solution", data.solution);
      }
    });
  }, [gameMode]);

  const toggleGameMode = () => {
    setGameMode((prevMode) => (prevMode === "Wordle" ? "Wordle+" : "Wordle"));
    setWordLength((prevMode) => (prevMode === 5 ? 6 : 5));
    setMaxAttempts((prevMode) => (prevMode === 6 ? 7 : 6));
  };

  const toggleInfo = () => {};

  return (
    <ThemeProvider>
      <div className="App">
        <Header
          gameMode={gameMode}
          toggleGameMode={toggleGameMode}
          toggleInfo={toggleInfo}
        />
        {words && solution && (
          <Wordle
            solution={solution}
            validGuesses={words}
            wordLength={wordLength}
            maxAttempts={maxAttempts}
          />
        )}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
