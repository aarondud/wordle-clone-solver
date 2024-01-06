import Wordle from "./components/Wordle.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer.jsx";
import Modal from "./components/Modal/Modal.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { GameModeProvider } from "./contexts/GameModeContext.jsx";
import { useState } from "react";

function App() {
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const updateModalType = (type) => {
    setModalType(type);
  };

  const ModalHandler = () => {
    return (
      showModal && (
        <Modal
          modalType={modalType}
          showModal={showModal}
          setShowModal={setShowModal}
          updateModalType={updateModalType}
        />
      )
    );
  };

  return (
    <GameModeProvider>
      <ThemeProvider>
        <div className="App">
          <Header
            setShowModal={setShowModal}
            updateModalType={updateModalType}
          />
          <Wordle
            updateModalType={updateModalType}
            setShowModal={setShowModal}
          />
          <Footer />
          <ModalHandler />
        </div>
      </ThemeProvider>
    </GameModeProvider>
  );
}

export default App;
