import React, { useEffect } from "react";
import "./CashChargeBtn.css";
import { ReactSVG } from "react-svg";
import { cashIcon } from "../../constants/cash";

const CashChargeBtn = () => {
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
    <button className="cash-charge-btn">
      <ReactSVG src={cashIcon.money} className="cash-charge-img" />
      캐시 충전
    </button>
  );
};

export default CashChargeBtn;
