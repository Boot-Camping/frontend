import React, { useState, useEffect } from "react";
import "./PaymentPage.css";
import NumCounter from "../../utils/numCounter";
import { detailCampingInfo } from "../../constants/detailCampingInfo";
import { useCampingDays } from "../../hooks/CampingDaysContext";

// const getDetailCampingInfo = (id) => {
//   return detailCampingInfo.find((info) => info.id === id);
// };

// const { label: priceLabel, value: paymentInfo.price } = getDetailCampingInfo("price");
// const { label: paymentInfo.overChargeLabel, value: paymentInfo.overCharge } =
//   getDetailCampingInfo("paymentInfo.overCharge");
// const { label: maxNumLabel, value: paymentInfo.maxNum } =
//   getDetailCampingInfo("maxNum");
// const totalAmountLabel = getDetailCampingInfo("totalAmount").label;

const PaymentAmount = ({ paymentInfo }) => {
  const { campingDays } = useCampingDays();
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

        <div className="over-charge">
          <div>초과인원당 추가비용</div>
          <div>{paymentInfo.overCharge.toLocaleString()} 원/명</div>
        </div>

        <div className="extra-number">
          <div>최대 수용인원</div>
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

        <div className="total-amount">
          <div>총 결제금액</div>
          <div>{totalAmount.toLocaleString()} 원</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAmount;
