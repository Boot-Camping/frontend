import React from "react";
import "./PaymentPage.css";

const PaymentInfo = () => {
  return (
    <div>
      <div>
        <div className="payment-info-title">
          <h3>예약자 정보</h3>
          <button className="reset-button">새로 입력하기</button>
        </div>
        <div className="payment-info">
          <div>
            <p>이름*</p>
            <input
              type="text"
              className="input-name"
              placeholder="이름을 입력해 주세요."
            />
          </div>

          <div>
            <p>연락처*</p>
            <input
              type="number"
              className="input-number"
              placeholder="연락처를 입력해 주세요."
            />
          </div>

          <div>
            <p>요청사항</p>
            <input
              type="text"
              className="input-require"
              placeholder="업체에게 전달할 요청사항을 적어주세요!"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
