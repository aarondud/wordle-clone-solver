import React, { useContext } from "react";
import HelperModal from "./HelperModal";
import EndOfGameModal from "./EndOfGamemodal";
import { ThemeContext } from "../../contexts/ThemeContext";

const Modal = ({ modalType, showModal, setShowModal }) => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`modal-overlay ${showModal ? "visible" : ""} ${
        darkTheme ? "dark" : ""
      }`}
    >
      {modalType === "helper" ? (
        <HelperModal showModal={showModal} setShowModal={setShowModal} />
      ) : (
        <EndOfGameModal setShowModal={setShowModal} modalType={modalType} />
      )}
    </div>
  );
};

export default Modal;
