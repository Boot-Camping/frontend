import React, { useState, useEffect } from "react";
import "./PaymentPage.css";
import NumCounter from "../../utils/numCounter";
import { detailCampingInfo } from "../../constants/detailCampingInfo";

const getDetailCampingInfo = (id) => {
  return detailCampingInfo.find((info) => info.id === id);
};

const { value: onedayPrice } = getDetailCampingInfo("price");
const { value: overCharge } = getDetailCampingInfo("overCharge");
const { value: campingDays } = getDetailCampingInfo("campingDays");
const { value: standardNum } = getDetailCampingInfo("standardNum");

const maxExtraNum = getDetailCampingInfo("extraNum").value;

const PaymentAmount = () => {
  const [extraNum, setExtraNum] = useState(
    getDetailCampingInfo("extraNum").value
  );
  const [totalAmount, setTotalAmount] = useState(onedayPrice * campingDays);

  useEffect(() => {
    const extraCharge = extraNum * overCharge;
    setTotalAmount(onedayPrice * campingDays + extraCharge);
  }, [extraNum, onedayPrice, campingDays, overCharge]);

  const extraNumChangeHandle = (newCount) => {
    setExtraNum(newCount);
  };

  return (
    <div>
      <div className="payment underline">
        <h3 className="payment-amount-title">결제금액</h3>

        <div className="oneday-price">
          <div>{getDetailCampingInfo("price").label}</div>
          <div>{onedayPrice.toLocaleString()} 원</div>
        </div>

        <div className="camping-days">
          <div>{getDetailCampingInfo("campingDays").label}</div>
          <div>{campingDays} 박</div>
        </div>

        <div className="standard-num">
          <div>{getDetailCampingInfo("standardNum").label}</div>
          <div>{standardNum} 명</div>
        </div>

        <div className="extra-number">
          <div>{getDetailCampingInfo("extraNum").label}</div>
          <div>
            <NumCounter
              onCountChange={extraNumChangeHandle}
              maxCount={maxExtraNum}
            />
          </div>
        </div>

        <div className="over-charge">
          <div>{getDetailCampingInfo("overCharge").label}</div>
          <div>{overCharge.toLocaleString()} 원/명</div>
        </div>

        <div className="total-amount">
          <div>{getDetailCampingInfo("totalAmount").label}</div>
          <div>{totalAmount.toLocaleString()} 원</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAmount;
