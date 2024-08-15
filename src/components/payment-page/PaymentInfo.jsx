import React from "react";
import { useState } from "react";
import "./PaymentPage.css";

const PaymentInfo = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [request, setRequest] = useState("");

  const resetFormHandle = () => {
    setName("");
    setContact("");
    setRequest("");
  };

  return (
    <div>
      <div>
        <div className="payment-info-title">
          <h3>예약자 정보</h3>
          <button className="reset-button" onClick={resetFormHandle}>
            새로 입력하기
          </button>
        </div>

        <div className="payment-info">
          <div>
            <p>이름*</p>
            <input
              type="text"
              value={name}
              className="input-name"
              placeholder="이름을 입력해 주세요."
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <p>연락처*</p>
            <input
              type="number"
              value={contact}
              className="input-number"
              placeholder="연락처를 입력해 주세요."
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div>
            <p>요청사항</p>
            <input
              type="text"
              value={request}
              className="input-require"
              placeholder="업체에게 전달할 요청사항을 적어주세요!"
              onChange={(e) => setRequest(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
