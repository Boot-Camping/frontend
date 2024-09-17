import React, { useEffect, useState } from "react";
import "./CashChargeBtn.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import CashChargeModal from "./CashChargeModal";

const CashChargeBtn = ({ totalCash, onSuccess }) => {
  const [isOpened, setIsOpened] = useState(false);

  const clickButtonHandle = () => {
    setIsOpened(true);
  };

  useEffect(() => {
    updateFooterClass();

    return () => {
      resetFooterClass();
    };
  }, []);

  const updateFooterClass = () => {
    const footer = document.querySelector(".footer");

    if (window.location.pathname === "/cash") {
      footer.classList.add("footer-cash-page");
    }
  };

  const resetFooterClass = () => {
    const footer = document.querySelector(".footer");

    if (footer) {
      footer.classList.remove("footer-cash-page");
    }
  };

  return (
    <>
      <button className="cash-charge-btn" onClick={clickButtonHandle}>
        <ReactSVG src={svgCollection.money} className="cash-charge-img" />
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
