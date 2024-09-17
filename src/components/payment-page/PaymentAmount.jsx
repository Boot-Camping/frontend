import React, { useState, useEffect } from "react";
import "./PaymentPage.css";
import NumCounter from "./NumCounter";
import { useCampingDays } from "../../context/campingDaysContext";

const PaymentAmount = ({ campInfo, checkIn, checkOut, paymentDataHandle }) => {
  const { campingDays } = useCampingDays();
  const [standardNum, setStandardNum] = useState(campInfo.standardNum);
  const [extraNum, setExtraNum] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const formatDate = (date) =>
    date instanceof Date
      ? date.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "잘못된 날짜";

  const totalBookNum = standardNum + extraNum;

  useEffect(() => {
    const calculatedTotalAmount =
      campInfo.price * (campingDays - 1) +
      campInfo.overCharge * extraNum * (campingDays - 1);

    setTotalAmount(calculatedTotalAmount);

    paymentDataHandle(calculatedTotalAmount, totalBookNum);
  }, [standardNum, extraNum, campInfo.price, campingDays, campInfo.overCharge]);

  const standardNumHandle = (newCount) => {
    setStandardNum(newCount);
  };

  const extraNumHandle = (newCount) => {
    setExtraNum(newCount);
  };

  return (
    <div>
      <div className="payment">
        <h3 className="payment-amount-title">결제금액</h3>

        <div className="oneday-price">
          <div>1박 가격</div>
          <div>{campInfo.price?.toLocaleString()} 원</div>
        </div>

        <div className="standard-num">
          <div>캠핑 예약인원</div>
          <div>
            <NumCounter
              maxCount={campInfo.standardNum}
              onCountChange={standardNumHandle}
            />
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
              maxCount={campInfo.maxNum - standardNum}
              onCountChange={extraNumHandle}
            />
          </div>
        </div>

        <div className="total-num">
          <div>총 예약인원</div>
          <div>{totalBookNum}명</div>
        </div>

        <div className="camping-days">
          <div>캠핑일수</div>
          <div>{campingDays - 1} 박</div>
        </div>

        <div className="checkIn-checkOut-box">
          <div className="checkIn-checkOut-title">체크인-체크아웃 </div>

          <div className="checkIn-checkOut-date">
            <div className="checkin-date">{formatDate(checkIn)}</div>
            <div className="checkout-date">~ {formatDate(checkOut)}</div>
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
