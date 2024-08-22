import React, { useState } from "react";
import "../components/notice-page/NoticePage.css";
import "../components/notice-page/NoticeFilter.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import NoticeList from "../components/notice-page/NoticeList";
import { saveIcon } from "../constants/save";
import SaveMoreBtn from "../components/save-page/SaveMoreBtn";
import { useLoadMore } from "../hooks/useLoadMore";
import { noticeData } from "../constants/notice";
import PaidFilter from "../components/paid-page/PaidFilter";
import { filterType } from "../constants/filterType";
import { filterData } from "../utils/filterData";

const NoticePage = () => {
  const [filter, setFilter] = useState("all");
  const filteredItems = filterData(noticeData, filter, "noticeStatus");
  const { visibleItems, loadMore, hasMoreItems } = useLoadMore(
    3,
    filteredItems
  );

  const filterChangeHandle = (status) => {
    setFilter(status);
  };

  return (
    <section className="notice-page-wrap">
      <div className="notice-title-wrap">
        <Link to={"/mypage"}>
          <ReactSVG src={saveIcon.prev} className="notice-move-prev" />
        </Link>
        <div>공지사항 및 이벤트</div>
      </div>

      <PaidFilter
        filterChangeHandle={filterChangeHandle}
        filterType={filterType.notice}
        wrapClassName="notice-page-filter"
        allClassName="event-filter"
      />

      <NoticeList
        visibleItems={visibleItems}
        noticeData={filteredItems}
        filter={filter}
      />

      {hasMoreItems && (
        <SaveMoreBtn onClick={loadMore} hasMoreItems={hasMoreItems} />
      )}
    </section>
  );
};

export default NoticePage;
