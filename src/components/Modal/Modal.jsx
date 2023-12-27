import React, { useContext, useState, useEffect } from "react";
import HelperModal from "./HelperModal";
import EndOfGameModal from "./EndOfGamemodal";
import { ThemeContext } from "../../contexts/ThemeContext";

const Modal = ({ modalType, showModal, setShowModal }) => {
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
      setTimeout(() => setShowModal(false), 300);
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
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default Modal;
