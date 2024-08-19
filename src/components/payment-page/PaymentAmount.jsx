import React from "react";
import "./PaymentPage.css";
import NumCounter from "../../utils/numCounter";
import { paymentAmountInfo } from "../../constants/paymentAmountInfo";
import { detailPageCampingInfo } from "../../constants/detailPageCampingInfo";

const onedayPrice = detailPageCampingInfo[7];
const extraNum = detailPageCampingInfo[8];
const overCharge = detailPageCampingInfo[9];
const campingDays = detailPageCampingInfo[10];
const totalAmount = detailPageCampingInfo[11];

const PaymentAmount = () => {
  return (
    <div>
      <div className="payment underline">
        <h3 className="payment-amount-title">결제금액</h3>
        {/* <div className="number-counter">
          <div className="number-counter-title">예약인원</div>
          <NumCounter />
        </div>

        <div>
          {paymentAmountInfo.map((item) => (
            <div key={item.key} className={`payment-amount-${item.key}`}>
              {item.isButton ? (
                <button className="coupon-button">{item.label}</button>
              ) : (
                <div>{item.label}</div>
              )}
              <div>{item.value}</div>
            </div>
          ))}
        </div> */}
        <div className="standardNum">
          <div>{onedayPrice.label}</div>
          <div>{onedayPrice.value}</div>
        </div>

        <div className="campingDays">
          <div>{campingDays.label}</div>
          <div>{campingDays.value}</div>
        </div>

        <div className="extra-number">
          <div>{extraNum.label}</div>
          <div>
            <NumCounter />
          </div>
        </div>

        <div className="overCharge">
          <div>{overCharge.label}</div>
          <div>{overCharge.value}</div>
        </div>

        <div className="totalAmount">
          <div>{totalAmount.label}</div>
          <div>{totalAmount.value}</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAmount;
