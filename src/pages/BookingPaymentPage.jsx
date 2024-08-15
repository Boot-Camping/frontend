import React from "react";
import "../components/booking-payment-page/BookingPaymentPage.css";

const BookingPayment = () => {
  return (
    <>
      <h2>캠핑장 결제하기</h2>

      <div className="user-info">
        <h3>예약자 정보</h3>
        <button>새로 입력하기</button>
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

      <div className="payment-policy">
        <h2>약관동의</h2>
        <div className="policy-detail">
          <div className="policy-1">
            <img src="../assets/check2.svg" alt="" />
            모두 동의
          </div>
          <div className="policy-2">
            <img src="../assets/check2.svg" alt="" />
            (필수) 결제 서비스 이용 양관, 개인정보 처리 동의
          </div>
          <div className="policy-3">
            <img src="../assets/check2.svg" alt="" />
            (필수) 캠핑장 운영정책 동의
          </div>
          <div className="policy-4">
            <img src="../assets/check2.svg" alt="" />
            (필수) 취소/ 환불규정 동의
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPayment;
