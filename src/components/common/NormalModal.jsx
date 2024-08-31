import React from "react";
import ReactDOM from "react-dom";
import "../payment-page/PaymentPage.css";

const NormalModal = ({ isModalOpen, children }) => {
  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default NormalModal;
