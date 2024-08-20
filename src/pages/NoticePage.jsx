import React from "react";
import "../components/notice-page/NoticePage.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import NoticeList from "../components/notice-page/NoticeList";
import { saveIcon } from "../constants/save";
import SaveMoreBtn from "../components/save-page/SaveMoreBtn";
import { useLoadMore } from "../hooks/useLoadMore";
import { noticeData } from "../constants/notice";

const NoticePage = () => {
  const { visibleItems, loadMore, hasMoreItems } = useLoadMore(6, noticeData);

  return (
    <section className="notice-page-wrap">
      <div className="notice-title-wrap">
        <Link to={"/mypage"}>
          <ReactSVG src={saveIcon.prev} className="notice-move-prev" />
        </Link>
        <div>공지사항</div>
      </div>

      <NoticeList visibleItems={visibleItems} noticeData={noticeData} />

      <SaveMoreBtn onClick={loadMore} hasMoreItems={hasMoreItems} />
    </section>
  );
};

export default NoticePage;
