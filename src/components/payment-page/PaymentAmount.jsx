import React, { useState, useEffect } from "react";
import "./PaymentPage.css";
import NumCounter from "../../utils/numCounter";
import { useCampingDays } from "../../hooks/CampingDaysContext";

const PaymentAmount = ({ campInfo, checkIn, checkOut }) => {
  const { campingDays } = useCampingDays();
  const [maxNum, setMaxNum] = useState(campInfo.maxNum);
  const [totalAmount, setTotalAmount] = useState(
    (campInfo.price + campInfo.overCharge * campInfo.maxNum) * (campingDays - 1)
  );

  useEffect(() => {
    setTotalAmount(
      (campInfo.price + campInfo.overCharge * maxNum) * (campingDays - 1)
    );
  }, [maxNum, campInfo.price, campingDays, campInfo.overCharge]);

  const maxNumChangeHandle = (newCount) => {
    setMaxNum(newCount);
  };

  const formattedCheckIn =
    checkIn instanceof Date
      ? checkIn.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "잘못된 날짜";

  const formattedCheckOut =
    checkOut instanceof Date
      ? checkOut.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "잘못된 날짜";

  return (
    <div>
      <div className="payment underline">
        <h3 className="payment-amount-title">결제금액</h3>

        <div className="oneday-price">
          <div>1박 가격</div>
          <div>{campInfo.price?.toLocaleString()} 원</div>
        </div>

        <div className="standard-num">
          <div>캠핑 예약인원</div>
          <div>
            <NumCounter maxCount={campInfo.standardNum} />
          </div>
        </div>

        <div className="over-charge">
          <div>초과인원당 추가비용</div>
          <div>{campInfo.overCharge?.toLocaleString()} 원/명</div>
        </div>

        <div className="extra-num">
          <div>초과인원</div>
          <div>
            <NumCounter
              onCountChange={maxNumChangeHandle}
              maxCount={campInfo.maxNum}
            />
          </div>
        </div>

        <div className="camping-days">
          <div>캠핑일수</div>
          <div>{campingDays - 1} 박</div>
        </div>

        <div className="checkIn-checkOut-box">
          <div className="checkin-box">
            <div className="checkin-title">체크인 </div>
            <div className="checkin-date">{formattedCheckIn}</div>
          </div>

          <div className="checkout-box">
            <div className="checkout-title">체크아웃 </div>
            <div className="checkout-date">{formattedCheckOut}</div>
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
