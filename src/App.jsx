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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const updateModalType = (type) => {
    setModalType(type);
  };

  return (
    <GameModeProvider>
      <ThemeProvider>
        <div className="App">
          <Header toggleModal={toggleModal} updateModalType={updateModalType} />
          <Wordle toggleModal={toggleModal} updateModalType={updateModalType} />
          <Footer />
          {showModal && (
            <Modal
              modalType={modalType}
              showModal={showModal}
              toggleModal={toggleModal}
            />
          )}
        </div>
      </ThemeProvider>
    </GameModeProvider>
  );
}

export default App;
