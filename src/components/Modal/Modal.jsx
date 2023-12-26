import React, { useContext } from "react";
import HelperModal from "./HelperModal";
import EndOfGameModal from "./EndOfGamemodal";
import { ThemeContext } from "../../contexts/ThemeContext";

const Modal = ({ modalType, showModal, setShowModal }) => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`modal-overlay ${showModal ? "visisble" : ""} ${
        darkTheme ? "dark" : ""
      }`}
    >
      {modalType === "helper" ? (
        <HelperModal
          className={`helper ${showModal ? "visisble" : ""}`}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : (
        <EndOfGameModal
          className={`end-of-game ${showModal ? "visisble" : ""}`}
          setShowModal={setShowModal}
          modalType={modalType}
        />
      )}
    </div>
  );
};

export default Modal;
