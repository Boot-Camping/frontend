import React from "react";
import { useState } from "react";
import "./PaymentPage.css";
import { paymentInfoForm } from "../../constants/paymentInfoForm";

const PaymentInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    request: "",
  });

  const resetFormHandle = () => {
    setFormData({
      name: "",
      phoneNumber: "",
      request: "",
    });
  };

  const inputChangeHandle = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  return (
    <div>
      <div className="payment-info-title">
        <h3>예약자 정보</h3>
        <button className="reset-button" onClick={resetFormHandle}>
          새로 입력하기
        </button>
      </div>

      <div className="payment-info-detail underline">
        {paymentInfoForm.map((field) => (
          <div key={field.id} className={`payment-info-detail-${field.id}`}>
            <p>{field.label}</p>
            <input
              type={field.type}
              value={formData[field.id]}
              className={`input-${field.id}`}
              placeholder={field.placeholder}
              onChange={(e) => inputChangeHandle(e, field.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentInfo;
