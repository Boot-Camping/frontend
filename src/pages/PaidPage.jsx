import React from "react";
import "../components/paid-page/PaidPage.css";
import { ReactSVG } from "react-svg";
import { paidIcon } from "../constants/paid";
import PaidFilter from "../components/paid-page/PaidFilter";
import PaidList from "../components/paid-page/PaidList";
import { Link } from "react-router-dom";

const PaidPage = () => {
  return (
    <section className="paid-wrap">
      <div className="paid-title-wrap">
        <Link to={"/mypage"}>
          <ReactSVG src={paidIcon.prev} className="paid-move-prev" />
        </Link>
        <div>결제 내역</div>
      </div>

      <PaidFilter />

      <PaidList />
    </section>
  );
};

export default PaidPage;
