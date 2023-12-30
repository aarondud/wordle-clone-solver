import React, { useContext, useState, useEffect } from "react";
import HelperModal from "./HelperModal";
import { ThemeContext } from "../../contexts/ThemeContext";
import EndOfGameModal from "./EndOfGamemodal";

const MODAL_TRANSITION_TIME = 300;

const Modal = ({ modalType, showModal, toggleModal }) => {
  const { darkTheme } = useContext(ThemeContext);
  const [isModalVisible, setIsModalVisible] = useState(null);

  useEffect(() => {
    // workaround conditional rendering to trigger animations
    if (showModal) {
      setIsModalVisible(true);
    }
  }, [showModal]);

  useEffect(() => {
    // workaround conditional rendering to trigger animations
    if (isModalVisible === false) {
      setTimeout(() => toggleModal(), MODAL_TRANSITION_TIME);
    }
  }, [isModalVisible]);

  return (
    <div
      className={`modal-overlay ${isModalVisible ? "visible" : ""} ${
        darkTheme ? "dark" : ""
      }`}
    >
      {modalType === "helper" ? (
        <HelperModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      ) : (
        <EndOfGameModal
          modalType={modalType}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </div>
  );
};

export default Modal;
