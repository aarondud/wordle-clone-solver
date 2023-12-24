import Wordle from "./components/Wordle.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Modal from "./components/Modal.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { GameModeProvider } from "./contexts/GameModeContext.jsx";
import { useState } from "react";

function App() {
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <ThemeProvider>
      <GameModeProvider>
        <div className="App">
          <Header setShowModal={setShowModal} setModalType={setModalType} />
          <Wordle setShowModal={setShowModal} setModalType={setModalType} />
          <Footer />
          {showModal && (
            <Modal
              modalType={modalType}
              setModalType={setModalType}
              setShowModal={setShowModal}
            />
          )}
        </div>
      </GameModeProvider>
    </ThemeProvider>
  );
}

export default App;
