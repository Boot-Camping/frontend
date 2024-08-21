import React, { useState, useRef } from "react";
import "../components/notice-page/NoticePage.css";
import "../components/notice-page/NoticeFilter.css";
import { shortDateDot } from "../utils/shortDateDot";
import { filterData } from "../utils/filterData";
import { Link } from "react-router-dom";
import "../components/admin-notice-register/AdminNoticeListPage.css";
import { ReactSVG } from "react-svg";
import SaveMoreBtn from "../components/save-page/SaveMoreBtn";
import { useLoadMore } from "../hooks/useLoadMore";
import { noticeData } from "../constants/notice";
import PaidFilter from "../components/paid-page/PaidFilter";
import { filterType } from "../constants/filterType";
import AdminNoticeList from "../components/admin-notice-register/AdminNoticeList";

const AdminNoticeListPage = () => {
  const { visibleItems, loadMore, hasMoreItems } = useLoadMore(6, noticeData);
  const [filter, setFilter] = useState("all");

  const [selectedCategory, setSelectedCategory] = useState(null);

  const filterChangeHandle = (status) => {
    setFilter(status);
  };

  const toggleCategory = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div>
      <Link to={"/admin"}>
        <ReactSVG
          className="admin-home-icon"
          src="../../src/assets/svg/home.svg"
          alt=""
        />
      </Link>
      <div className="notice-page-title">공지사항</div>

      <div className="notice-regi-btn">
        <Link to={"/admin/notice-regi"}>
          <button className="notice-register-btn">+ 등록</button>
        </Link>
      </div>

      <div className="notice-list-wrap">
        <PaidFilter
          filterChangeHandle={filterChangeHandle}
          filterType={filterType.notice}
          wrapClassName="notice-page-filter"
          allClassName="event-filter"
        />

        <AdminNoticeList
          visibleItems={visibleItems}
          noticeData={noticeData}
          filter={filter}
        />

        <SaveMoreBtn onClick={loadMore} hasMoreItems={hasMoreItems} />
      </div>
    </div>
  );
};

export default AdminNoticeListPage;
