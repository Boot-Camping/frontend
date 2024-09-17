import React from "react";
import "./NoticeLink.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";

const NoticeLink = () => {
  return (
    <Link to="/notice" className="mypage-btn-notice">
      <div className="mypage-notice-text">
        <div>공지사항 및 이벤트</div>
        <div>공지사항과 진행중인 이벤트를 확인하세요</div>
      </div>
      <ReactSVG src={svgCollection.prev} className="mypage-notice-icon" />
    </Link>
  );
};

export default NoticeLink;
