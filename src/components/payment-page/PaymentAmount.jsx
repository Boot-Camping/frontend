import React, { useState, useEffect } from "react";
import "./PaymentPage.css";
import NumCounter from "../../utils/numCounter";
import { detailCampingInfo } from "../../constants/detailCampingInfo";

const getDetailCampingInfo = (id) => {
  return detailCampingInfo.find((info) => info.id === id);
};

const { label: priceLabel, value: onedayPrice } = getDetailCampingInfo("price");

const { label: overChargeLabel, value: overCharge } =
  getDetailCampingInfo("overCharge");

const { label: campingDaysLabel, value: campingDays } =
  getDetailCampingInfo("campingDays");

const { label: extraNumLabel, value: maxExtraNum } =
  getDetailCampingInfo("extraNum");

const totalAmountLabel = getDetailCampingInfo("totalAmount").label;

const PaymentAmount = () => {
  const [extraNum, setExtraNum] = useState(maxExtraNum);
  const [totalAmount, setTotalAmount] = useState(
    (onedayPrice + overCharge * maxExtraNum) * campingDays
  );

  useEffect(() => {
    setTotalAmount((onedayPrice + overCharge * extraNum) * campingDays);
  }, [extraNum, onedayPrice, campingDays, overCharge]);

  const extraNumChangeHandle = (newCount) => {
    setExtraNum(newCount);
  };

  return (
    <div>
      <div className="payment underline">
        <h3 className="payment-amount-title">결제금액</h3>

        <div className="oneday-price">
          <div>{priceLabel}</div>
          <div>{onedayPrice.toLocaleString()} 원</div>
        </div>

        <div className="over-charge">
          <div>{overChargeLabel}</div>
          <div>{overCharge.toLocaleString()} 원/명</div>
        </div>

        <div className="extra-number">
          <div>{extraNumLabel}</div>
          <div>
            <NumCounter
              onCountChange={extraNumChangeHandle}
              maxCount={maxExtraNum}
            />
          </div>
        </div>

        <div className="camping-days">
          <div>{campingDaysLabel}</div>
          <div>{campingDays} 박</div>
        </div>

        <div className="total-amount">
          <div>{totalAmountLabel}</div>
          <div>{totalAmount.toLocaleString()} 원</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAmount;
