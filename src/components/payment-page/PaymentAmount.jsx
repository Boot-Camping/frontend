import React from "react";
import "./PaymentPage.css";

const PaymentAmount = () => {
  return (
    <div>
      <div className="payment">
        <h3 className="payment-title">결제금액</h3>

        <div className="payment-detail">
          <div>
            <div>1일 숙박비</div>
            <div>숙박 예약 요금(4박)</div>
            <div>초과인원당 추가비용(2명 * 4박)</div>
            <button>쿠폰 선택</button>
            <div className="total">총 결제금액</div>
          </div>

          <div>
            <div>40,000원</div>
            <div>160,000원</div>
            <div>80,000원</div>
            <div>-30,000원</div>
            <div className="total-amount">210,000원</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAmount;
