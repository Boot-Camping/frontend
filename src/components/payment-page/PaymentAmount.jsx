import React from "react";
import "./PaymentPage.css";
import { paymentAmountInfo } from "../../constants/paymentAmountInfo";

const PaymentAmount = () => {
  return (
    <div>
      <div className="payment underline">
        <h3 className="payment-amount-title">결제금액</h3>

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
        </div>
      </div>
    </div>
  );
};

export default PaymentAmount;
