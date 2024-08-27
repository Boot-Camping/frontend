import React, { useEffect, useState } from "react";
import "../components/paid-page/PaidPage.css";
import "../components/paid-page/PaidFilter.css";
import { ReactSVG } from "react-svg";
import PaidFilter from "../components/paid-page/PaidFilter";
import PaidList from "../components/paid-page/PaidList";
import { Link } from "react-router-dom";
import { filterType } from "../constants/filterType";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get } from "../utils/Api";
import { svgCollection } from "../constants/svgCollection";

const PaidPage = () => {
  const { accessToken, userId } = getUserIdFromToken();
  const [paidData, setPaidData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const getPaidData = async () => {
      const customHeaders = {
        Authorization: `${accessToken}`,
      };

      try {
        const response = await get(`book/${userId}`, customHeaders);

        console.log(response);
        setPaidData(response);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getPaidData();
  }, [accessToken, userId]);

  const filterChangeHandle = (status) => {
    setFilter(status);
  };

  return (
    <section className="paid-wrap">
      <div className="paid-title-wrap">
        <Link to={"/mypage"}>
          <ReactSVG src={svgCollection.prev} className="paid-move-prev" />
        </Link>
        <div>결제 내역</div>
      </div>

      <PaidFilter
        filterChangeHandle={filterChangeHandle}
        filterType={filterType.paid}
        wrapClassName="paid-filter"
        allClassName="usage-filter"
      />

      <PaidList
        filter={filter}
        paidData={paidData}
        errorMessage={errorMessage}
      />
    </section>
  );
};

export default PaidPage;
