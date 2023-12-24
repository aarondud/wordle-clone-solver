import React, { useContext } from "react";
import HelperModal from "./HelperModal";
import EndOfGameModal from "./EndOfGamemodal";
import { ThemeContext } from "../../contexts/ThemeContext";

const Modal = ({ modalType, setShowModal }) => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`modal-overlay ${darkTheme ? "dark" : ""}`}>
      {modalType === "helper" ? (
        <HelperModal setShowModal={setShowModal} />
      ) : (
        <EndOfGameModal modalType={modalType} />
      )}
    </div>
  );
};

export default Modal;
