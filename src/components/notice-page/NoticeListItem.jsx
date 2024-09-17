import React from "react";
import "./NoticeListItem.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { shortDateDot } from "../../utils/shortDateDot";

const NoticeListItem = ({ data, linkPrefix, svgSrc }) => {
  return (
    <Link to={`${linkPrefix}/${data.id}`} className="notice-list">
      <div className="notice-info">
        <div className="notice-list-title">
          <div>{data.title}</div>
        </div>
        <div className="notice-date">{shortDateDot(data)}</div>
      </div>
      <ReactSVG src={svgSrc} className="notice-list-img" />
    </Link>
  );
};

export default NoticeListItem;
