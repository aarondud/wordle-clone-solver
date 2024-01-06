import React, { useContext, useState, useEffect } from "react";
import HelperModal from "./HelperModal";
import { ThemeContext } from "../../contexts/ThemeContext";
import EndOfGameModal from "./EndOfGamemodal";
import { GameModeContext } from "../../contexts/GameModeContext";

const EXIT_TRANSITION_TIME = 300;
const WIN_TRANSITION_TIME = 3500;
const LOSE_TRANSITION_TIME = 1500;

const Modal = ({ modalType, updateModalType, setShowModal }) => {
  const { darkTheme } = useContext(ThemeContext);
  const { isCorrect, attemptNo, maxAttempts } = useContext(GameModeContext);
  const [isModalVisible, setIsModalVisible] = useState(null);

  useEffect(() => {
    if (modalType === "helper") {
      setIsModalVisible(true);
    } else if (modalType === "win") {
      winModalOpen();
    } else {
      loseModalOpen();
    }
  }, []);

  const exitModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setShowModal(false);
      updateModalType(null);
    }, EXIT_TRANSITION_TIME);
  };

  const winModalOpen = () => {
    setTimeout(() => setIsModalVisible(isCorrect), WIN_TRANSITION_TIME);
  };

  const loseModalOpen = () => {
    setTimeout(
      () => setIsModalVisible(attemptNo >= maxAttempts),
      LOSE_TRANSITION_TIME
    );
  };

  return (
    <div
      className={`modal-overlay ${modalType} ${
        isModalVisible ? "visible" : ""
      } ${darkTheme ? "dark" : ""}`}
    >
      {modalType === "helper" ? (
        <HelperModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          exitModal={exitModal}
        />
      ) : (
        <EndOfGameModal
          modalType={modalType}
          isModalVisible={isModalVisible}
          exitModal={exitModal}
        />
      )}
    </div>
  );
};

export default Modal;
