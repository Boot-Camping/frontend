import React from "react";
import "../components/notice-page/NoticePage.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import NoticeList from "../components/notice-page/NoticeList";
import { saveIcon } from "../constants/save";

const NoticePage = () => {
  return (
    <section className="notice-page-wrap">
      <div className="notice-title-wrap">
        <Link to={"/mypage"}>
          <ReactSVG src={saveIcon.prev} className="notice-move-prev" />
        </Link>
        <div>공지사항</div>
      </div>

      <NoticeList />
    </section>
  );
};

export default NoticePage;
