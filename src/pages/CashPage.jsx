import React from "react";
import "../components/cash-page/CashPage.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { cashIcon } from "../constants/cash";
import CashFilter from "../components/cash-page/CashFilter";
import CashList from "../components/cash-page/CashList";
import CashChargeBtn from "../components/cash-page/CashChargeBtn";

const CashPage = () => {
  return (
    <section className="cash-page-wrap">
      <div className="cash-title-wrap">
        <Link to={"/mypage"}>
          <ReactSVG src={cashIcon.prev} className="cash-move-prev" />
        </Link>
        <div>캐시 충전/사용 내역</div>
      </div>

      <CashFilter />

      <CashList />

      <CashChargeBtn />
    </section>
  );
};

export default CashPage;
