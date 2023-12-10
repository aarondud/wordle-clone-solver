import "./App.css";
import Wordle from "./components/Wordle.jsx";
import { useEffect, useState } from "react";

function App() {
  const [words, setWords] = useState(null);
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/aarondud/77aaceafa65ec74ff82250f26d5e77ce/raw/623374aba869301b34d124d87207c34379a00dd5/wordle-5letter-words.txt"
        );

        if (!response.ok) {
          throw new Error("Network response not ok");
        }

        const wordsText = await response.text();
        const wordsArray = wordsText
          .split("\n")
          .filter((word) => word.trim() !== "");
        const wordsSet = new Set(wordsArray);
        setWords(wordsSet);
      } catch (error) {
        console.error("Error fetching words: ", error.message);
      }
    };
    fetchWords();
  }, []);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/aarondud/77aaceafa65ec74ff82250f26d5e77ce/raw/623374aba869301b34d124d87207c34379a00dd5/wordle-5letter-solutions.txt"
        );

        if (!response.ok) {
          throw new Error("Network response not ok");
        }

        const wordsText = await response.text();
        const wordsArray = wordsText
          .split("\n")
          .filter((word) => word.trim() !== "");

        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        const randomSolution = wordsArray[randomIndex];
        setSolution(randomSolution);
      } catch (error) {
        console.error("Error fetching words: ", error.message);
      }
    };
    fetchWords();
  }, []);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {words && solution && <Wordle solution={solution} validGuesses={words} />}
    </div>
  );
}

export default App;
