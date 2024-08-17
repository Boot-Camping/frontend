import React from "react";
import ReactDOM from "react-dom";
import "./PaymentPage.css";

const PaymentModal = ({ isModalOpen, closeModal, children }) => {
  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>,
    document.body
  );
};

export default PaymentModal;
