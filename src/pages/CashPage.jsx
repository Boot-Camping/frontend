import React, { useState } from "react";
import "../components/cash-page/CashPage.css";
import "../components/cash-page/CashFilter.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../constants/svgCollection";
import Filter from "../components/common/Filter";
import CashList from "../components/cash-page/CashList";
import CashChargeBtn from "../components/cash-page/CashChargeBtn";
import { filterType } from "../constants/filterType";
import useCash from "../hooks/useCash";
import EmptyContent from "../components/common/EmptyContent";

const CashPage = () => {
  const { cashData, errorMessage, loading, getCashData } = useCash();
  const [filter, setFilter] = useState("all");
  const [totalCash, setTotalCash] = useState(0);

  const changeFilterHandle = (status) => {
    setFilter(status);
  };

  const updateTotalCashHandle = (newTotalCash) => {
    setTotalCash(newTotalCash);
  };

  const renderLoding = () => <div>로딩중</div>;
  const renderError = () => <EmptyContent errorMessage={errorMessage} />;
  const renderCashList = () => (
    <CashList
      filter={filter}
      onTotalCashUpdate={updateTotalCashHandle}
      cashData={cashData}
      errorMessage={errorMessage}
    />
  );

  return (
    <section className="cash-page-wrap">
      <div className="cash-aside">
        <div className="cash-title-wrap">
          <Link to={"/mypage"}>
            <ReactSVG src={svgCollection.prev} className="cash-move-prev" />
          </Link>
          <div>캐시 충전/사용 내역</div>
        </div>
        <Filter
          filterChangeHandle={changeFilterHandle}
          filterType={filterType.cash}
          wrapClassName="cash-filter"
          allClassName="cash-all-filter"
        />
      </div>

      {loading
        ? renderLoding()
        : cashData.length
        ? renderCashList()
        : renderError()}

      <CashChargeBtn totalCash={totalCash} onSuccess={getCashData} />
    </section>
  );
};

export default CashPage;
