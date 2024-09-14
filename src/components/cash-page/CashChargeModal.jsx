import React, { useState } from "react";
import "./CashChargeModal.css";
import { chargePrice } from "../../constants/cash";
import { closeModal } from "../../utils/closeModal";
import PortalModal from "../common/PortalModal";
import useCashCharge from "../../hooks/useCashCharge";
import ChargePriceSelector from "./ChargePriceSelector";
import ChargeInfo from "./ChargeInfo";
import ChargeAmountDisplay from "./ChargeAmountDisplay";

const CashChargeModal = ({
  isOpened,
  setIsOpened,
  latestToTalCash,
  onSuccess,
}) => {
  const { chargeCash } = useCashCharge();
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectPrice, setSelectPrice] = useState(0);

  const clickPriceHandle = (index) => {
    setActiveIndex(index);
    setSelectPrice(chargePrice[index].price);
  };

  const clickCancelHandle = () => {
    closeModal(setIsOpened)();
    setActiveIndex(null);
    setSelectPrice(0);
  };

  const submitHandle = async () => {
    await chargeCash(selectPrice, clickCancelHandle, onSuccess);
  };

  return (
    <>
      {isOpened && (
        <PortalModal setIsOpened={setIsOpened}>
          <div className="cash-charge-modal modal">
            <div className="charge-title">캐시 충전</div>
            <ChargeAmountDisplay selectPrice={selectPrice} />
            <ChargePriceSelector
              chargePrice={chargePrice}
              activeIndex={activeIndex}
              clickPriceHandle={clickPriceHandle}
            />
            <ChargeInfo
              selectPrice={selectPrice}
              latestToTalCash={latestToTalCash}
            />
            <div className="charge-modal-btn">
              <button className="charge-cancel" onClick={clickCancelHandle}>
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
