import React from "react";
import "./PaymentPage.css";

const PaymentAmount = () => {
  return (
    <div>
      <div className="coupon-pick">
        <h3>할인 쿠폰</h3>
        <button>쿠폰 선택</button>
      </div>

      <div className="payment">
        <h3>결제금액</h3>
        <div className="payment-detail">
          <div className="payment-contents">
            <div className="oneday">1일 숙박비</div>
            <div className="all-day">숙박 예약 요금(4박)</div>
            <div className="over-number">초과인원당 추가비용(2명 * 4박)</div>
            <div className="coupon">쿠폰</div>
            <div className="total">총 결제금액</div>
          </div>

          <div className="payment-amount">
            <div className="oneday-amount">40,000원</div>
            <div className="all-day-amount">160,000원</div>
            <div className="over-charge">80,000원</div>
            <div className="coupon-amount">-30,000원</div>
            <div className="total-amount">210,000원</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAmount;
