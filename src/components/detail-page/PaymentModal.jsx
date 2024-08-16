import React from "react";
import ReactDOM from "react-dom";
import "./DetailPage.css";

const PaymentModal = ({ isModalOpen, closeModal, children }) => {
  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={closeModal}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default PaymentModal;
