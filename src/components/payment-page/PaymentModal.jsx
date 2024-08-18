import React from "react";
import ReactDOM from "react-dom";
import "./PaymentPage.css";

const PaymentModal = ({ isModalOpen, children }) => {
  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default PaymentModal;
