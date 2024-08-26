import React, { useEffect, useState } from "react";
import "./CashChargeBtn.css";
import { ReactSVG } from "react-svg";
import { cashIcon } from "../../constants/cash";
import CashChargeModal from "./CashChargeModal";

const CashChargeBtn = ({ totalCash, onSuccess }) => {
  const [isOpened, setIsOpened] = useState(false);

  const chargeModalHandle = () => {
    setIsOpened(true);
  };

  useEffect(() => {
    const footer = document.querySelector(".footer");

    if (window.location.pathname === "/cash") {
      footer.classList.add("footer-cash-page");
    }

    return () => {
      if (footer) {
        footer.classList.remove("footer-cash-page");
      }
    };
  }, []);

  return (
    <>
      <button className="cash-charge-btn" onClick={chargeModalHandle}>
        <ReactSVG src={cashIcon.money} className="cash-charge-img" />
        캐시 충전
      </button>

      <CashChargeModal
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        latestToTalCash={totalCash}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default CashChargeBtn;
