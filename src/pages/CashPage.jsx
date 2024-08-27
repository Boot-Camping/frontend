import React, { useEffect, useState } from "react";
import "../components/cash-page/CashPage.css";
import "../components/cash-page/CashFilter.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../constants/svgCollection";
import PaidFilter from "../components/paid-page/PaidFilter";
import CashList from "../components/cash-page/CashList";
import CashChargeBtn from "../components/cash-page/CashChargeBtn";
import { filterType } from "../constants/filterType";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get } from "../utils/Api";

const CashPage = () => {
  const { accessToken, userId } = getUserIdFromToken();
  const [cashData, setCashData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [totalCash, setTotalCash] = useState(0);

  const getCashData = async () => {
    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    try {
      const response = await get(
        `userprofile/cashTransaction/${userId}`,
        customHeaders
      );
      setCashData(response);
      setLoading(false);
      console.log("response", response);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getCashData();
  }, [accessToken, userId]);

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
          <ReactSVG src={svgCollection.prev} className="cash-move-prev" />
        </Link>
        <div>캐시 충전/사용 내역</div>
      </div>

      {loading ? (
        <div>로딩중</div>
      ) : cashData ? (
        <>
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
            errorMessage={errorMessage}
          />
        </>
      ) : (
        <div>사용자 정보를 찾을 수 없습니다</div>
      )}

      <CashChargeBtn totalCash={totalCash} onSuccess={getCashData} />
    </section>
  );
};

export default CashPage;
