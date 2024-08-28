import React, { useEffect, useState } from "react";
import "../components/paid-page/PaidPage.css";
import "../components/paid-page/PaidFilter.css";
import { ReactSVG } from "react-svg";
import Filter from "../components/common/Filter";
import PaidList from "../components/paid-page/PaidList";
import { Link } from "react-router-dom";
import { filterType } from "../constants/filterType";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get } from "../utils/api";
import { svgCollection } from "../constants/svgCollection";

const PaidPage = () => {
  const { accessToken } = getUserIdFromToken();
  const [paidData, setPaidData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const getPaidData = async () => {
      const customHeaders = {
        Authorization: `${accessToken}`,
      };

      try {
        const response = await get(`camps/bookings`, customHeaders);

        setPaidData(response);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getPaidData();
  }, [accessToken]);

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

      <Filter
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
