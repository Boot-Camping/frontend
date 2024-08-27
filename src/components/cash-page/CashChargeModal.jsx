import React, { useState } from "react";
import "./CashChargeModal.css";
import { ReactSVG } from "react-svg";
import { chargePrice } from "../../constants/cash";
import { svgCollection } from "../../constants/svgCollection";
import { createPortal } from "react-dom";
import { closeModal } from "../../utils/closeModal";
import { put } from "../../utils/api";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import PortalModal from "../common/PortalModal";

const CashChargeModal = ({
  isOpened,
  setIsOpened,
  latestToTalCash,
  onSuccess,
}) => {
  const { accessToken, userId } = getUserIdFromToken();
  const [errorMessage, setErrorMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectPrice, setSelectPrice] = useState(0);

  const priceClickHandle = (index) => {
    setActiveIndex(index);
    setSelectPrice(chargePrice[index].price);
  };

  const getTotalCash = () => {
    return (selectPrice + latestToTalCash).toLocaleString();
  };

  const cancleHandle = () => {
    closeModal(setIsOpened)();
    setActiveIndex(null);
    setSelectPrice(0);
  };

  const submitHandle = async () => {
    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    try {
      const requestBody = {
        cash: selectPrice,
      };
      await put(`user/chargeCash/${userId}`, requestBody, customHeaders);
      cancleHandle();
      onSuccess();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {isOpened && (
        <PortalModal setIsOpened={setIsOpened}>
          <div className="cash-charge-modal modal">
            <div className="charge-title">캐시 충전</div>
            <div className="charge-price-title-wrap">
              <div className="charge-price-title">
                <div>충전 캐시</div>
                <div>
                  {selectPrice > 0
                    ? `${selectPrice.toLocaleString()}원`
                    : "충전 금액을 선택하세요"}
                </div>
              </div>
              <ReactSVG
                src={svgCollection.money}
                className="charge-modal-img"
              />
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
              <div
                className={`confirm-price ${
                  !selectPrice > 0 && "confirm-price-hide"
                }`}
              >
                <div>잔액</div>
                <div>{latestToTalCash.toLocaleString()}원</div>
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
              <button className="charge-pay" onClick={submitHandle}>
                결제
              </button>
            </div>
          </div>
        </PortalModal>
      )}
    </>
  );
};

export default CashChargeModal;
