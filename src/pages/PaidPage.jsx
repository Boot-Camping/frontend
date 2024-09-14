import React, { useState } from "react";
import "../components/paid-page/PaidPage.css";
import { ReactSVG } from "react-svg";
import Filter from "../components/common/Filter";
import PaidList from "../components/paid-page/PaidList";
import { Link } from "react-router-dom";
import { filterType } from "../constants/filterType";
import { svgCollection } from "../constants/svgCollection";
import usePaid from "../hooks/usePaid";

const PaidPage = () => {
  const { paidData, errorMessage, setErrorMessage, getPaidData } = usePaid();
  const [filter, setFilter] = useState("all");

  const changeFilterHandle = (status) => {
    setFilter(status);
  };

  return (
    <section className="paid-wrap">
      <div className="paid-aside">
        <div className="paid-title-wrap">
          <Link to={"/mypage"}>
            <ReactSVG src={svgCollection.prev} className="paid-move-prev" />
          </Link>
          <div>결제 내역</div>
        </div>

        <Filter
          filterChangeHandle={changeFilterHandle}
          filterType={filterType.paid}
          wrapClassName="paid-filter"
          allClassName="usage-filter"
        />
      </div>

      <PaidList
        filter={filter}
        paidData={paidData}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        onUpdate={getPaidData}
      />
    </section>
  );
};

export default PaidPage;
