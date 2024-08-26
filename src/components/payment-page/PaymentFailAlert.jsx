import React from "react";
import "./PaymentPage.css";

const PaymentFailAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div>
      <div className="alert-message">
        <div className="alert-content">
          <p>{message}</p>
          <button onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailAlert;
