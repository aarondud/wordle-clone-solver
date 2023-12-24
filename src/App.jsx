import Wordle from "./components/Wordle.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import {
  GameModeContext,
  GameModeProvider,
} from "./contexts/GameModeContext.jsx";
import { useContext } from "react";

function App() {
  const { solution, validGuesses } = useContext(GameModeContext);
  return (
    <ThemeProvider>
      <GameModeProvider>
        <div className="App">
          <Header />
          {<Wordle />}
          <Footer />
        </div>
      </GameModeProvider>
    </ThemeProvider>
  );
}

export default App;

/*
 
{words && solution && (
            <Wordle solution={solution} validGuesses={words} />
          )}*/
