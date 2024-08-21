import React, { useState } from "react";
import "../components/cash-page/CashPage.css";
import "../components/cash-page/CashFilter.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { cashData, cashIcon } from "../constants/cash";
import PaidFilter from "../components/paid-page/PaidFilter";
import CashList from "../components/cash-page/CashList";
import CashChargeBtn from "../components/cash-page/CashChargeBtn";
import { filterType } from "../constants/filterType";

const CashPage = () => {
  const [filter, setFilter] = useState("all");
  const [totalCash, setTotalCash] = useState(0);

  const filterChangeHandle = (status) => {
    setFilter(status);
  };

  const totalCashUpdateHandle = (newTotalCash) => {
    setTotalCash(newTotalCash);
  };

  return (
    <section className="cash-page-wrap">
      <div className="cash-title-wrap">
        <Link to={"/mypage"}>
          <ReactSVG src={cashIcon.prev} className="cash-move-prev" />
        </Link>
        <div>캐시 충전/사용 내역</div>
      </div>

      <PaidFilter
        filterChangeHandle={filterChangeHandle}
        filterType={filterType.cash}
        wrapClassName="cash-filter"
        allClassName="cash-all-filter"
      />

      <CashList
        filter={filter}
        onTotalCashUpdate={totalCashUpdateHandle}
        cashData={cashData}
      />

      <CashChargeBtn totalCash={totalCash} />
    </section>
  );
};

export default CashPage;
