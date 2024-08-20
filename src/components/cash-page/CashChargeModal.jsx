import React, { useState } from "react";
import "./CashChargeModal.css";
import { ReactSVG } from "react-svg";
import { cashIcon, chargePrice } from "../../constants/cash";
import { createPortal } from "react-dom";
import { closeModal } from "../../utils/closeModal";

const CashChargeModal = ({ isOpened, setIsOpened, latestToTalCash }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectPrice, setSelectPrice] = useState(0);

  const priceClickHandle = (index) => {
    setActiveIndex(index);
    setSelectPrice(chargePrice[index].price);
  };

  const getTotalCash = () => {
    return selectPrice + latestToTalCash.toLocaleString();
  };

  const cancleHandle = () => {
    closeModal(setIsOpened)();
    setActiveIndex(null);
    setSelectPrice(0);
  };

  return (
    <>
      {isOpened && (
        <>
          {createPortal(
            <div className="overlay" onClick={cancleHandle}></div>,
            document.getElementById("overlay-root")
          )}
          {createPortal(
            <div className="cash-charge-modal modal">
              <div className="charge-title">캐시 충전</div>
              <div className="charge-price-title-wrap">
                <div className="charge-price-title">
                  <div>충전 캐시</div>
                  <div>
                    {selectPrice > 0
                      ? `${formatPrice(selectPrice)}원`
                      : "충전 금액을 선택하세요"}
                  </div>
                </div>
                <ReactSVG src={cashIcon.money} className="charge-modal-img" />
              </div>
              <div className="charge-price-wrap">
                {chargePrice.map((price, index) => (
                  <div
                    className={`charge-price-btn ${
                      activeIndex === index ? "charge-price-active" : ""
                    }`}
                    key={`charge-price-${index + 1}`}
                    onClick={() => priceClickHandle(index)}
                    value={price.price}
                  >
                    {price.priceBtn}
                  </div>
                ))}
              </div>
              <div className="charge-confirm">
                <div className="confirm-price">
                  <div>충전 금액</div>
                  <div>{selectPrice.toLocaleString()}원</div>
                </div>
                <div className="confirm-total-cash">
                  <div>{selectPrice > 0 ? "충전 후 잔액" : "잔액"}</div>
                  <div>{getTotalCash()}원</div>
                </div>
              </div>
              <div className="charge-modal-btn">
                <button className="charge-cancel" onClick={cancleHandle}>
                  취소
                </button>
                <button className="charge-pay">결제</button>
              </div>
            </div>,
            document.getElementById("modal-root")
          )}
        </>
      )}
    </>
  );
};

export default CashChargeModal;
