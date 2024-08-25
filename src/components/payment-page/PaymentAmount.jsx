import React, { useState, useEffect } from "react";
import "./PaymentPage.css";
import NumCounter from "../../utils/numCounter";
import { useCampingDays } from "../../hooks/CampingDaysContext";

const PaymentAmount = ({ paymentInfo }) => {
  const { campingDays, checkIn, checkOut } = useCampingDays();
  const [maxNum, setmaxNum] = useState(paymentInfo.maxNum);
  const [totalAmount, setTotalAmount] = useState(
    (paymentInfo.price + paymentInfo.overCharge * paymentInfo.maxNum) *
      (campingDays - 1)
  );

  useEffect(() => {
    setTotalAmount(
      (paymentInfo.price + paymentInfo.overCharge * maxNum) * (campingDays - 1)
    );
  }, [maxNum, paymentInfo.price, campingDays, paymentInfo.overCharge]);

  const maxNumChangeHandle = (newCount) => {
    setmaxNum(newCount);
  };

  return (
    <div>
      <div className="payment underline">
        <h3 className="payment-amount-title">결제금액</h3>

        <div className="oneday-price">
          <div>1박 가격</div>
          <div>{paymentInfo.price.toLocaleString()} 원</div>
        </div>

        <div className="standard-num">
          <div>캠핑 예약인원</div>
          <div>
            <NumCounter
              onCountChange={maxNumChangeHandle}
              maxCount={paymentInfo.standardNum}
            />
          </div>
        </div>

        <div className="over-charge">
          <div>초과인원당 추가비용</div>
          <div>{paymentInfo.overCharge.toLocaleString()} 원/명</div>
        </div>

        <div className="extra-num">
          <div>초과인원</div>
          <div>
            <NumCounter
              onCountChange={maxNumChangeHandle}
              maxCount={paymentInfo.maxNum}
            />
          </div>
        </div>

        <div className="camping-days">
          <div>캠핑일수</div>
          <div>{campingDays - 1} 박</div>
        </div>
        <div className="checkIn-checkOut-box">
          <div className="checkIn-box">
            <div>체크인</div>
            <div>{checkIn.toLocaleString()}</div>
          </div>

          <div className="checkOut-box">
            <div>체크아웃</div>
            <div>{checkOut.toLocaleString()}</div>
          </div>
        </div>

        <div className="total-amount">
          <div>총 결제금액</div>
          <div>{totalAmount.toLocaleString()} 원</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAmount;
