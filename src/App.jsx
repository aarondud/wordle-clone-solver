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
          "https://gist.githubusercontent.com/aarondud/b21c0fb51c921fe31bd470d2e5a86430/raw/a974c661f97128f9be6f5a12c3f4312a90314398/wordle-5letter-words.json"
        );

        if (!response.ok) {
          throw new Error("Network response not ok");
        }

        const wordsArray = await response.json();
        setWords(wordsArray);
      } catch (error) {
        console.error("Error fetching words: ", error.message);
      }
    };
    fetchWords();
  }, []);

  useEffect(() => {
    if (words) {
      const solution = words[Math.floor(Math.random() * words.length)];
      setSolution(solution);
    }
  }, [words, setSolution]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {words && solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
