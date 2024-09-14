import React from "react";
import "./NoticeDetailContent.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import { shortDateDot } from "../../utils/shortDateDot";

const NoticeDetailContent = ({ notice, navigateBackHandle }) => {
  return (
    <>
      <div className="notice-detail-info-wrap">
        <div className="move-prev">
          <ReactSVG
            src={svgCollection.prev}
            className="notice-move-prev"
            onClick={navigateBackHandle}
          />
          <div>목록</div>
        </div>
        <div className="notice-detail-info">
          <div className="notice-detail-title">{notice.title}</div>
        </div>
        <div className="notice-detail-date underline">
          {shortDateDot(notice)}
        </div>
      </div>
      <div className="notice-detail-desc">{notice.description}</div>
    </>
  );
};

export default NoticeDetailContent;
