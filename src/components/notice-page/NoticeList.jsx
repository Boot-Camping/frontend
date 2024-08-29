import React from "react";
import "./NoticeList.css";
import { Link } from "react-router-dom";
import { shortDateDot } from "../../utils/shortDateDot";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import { filterData } from "../../utils/filterData";

// const NoticeList = ({ visibleItems, noticeData, filter }) => {
const NoticeList = ({ noticeData }) => {
  // const filteredData = filterData(noticeData, filter, "noticeStatus");

  return (
    <div className="notice-list-wrap">
      {noticeData.map((data, index) => (
        <Link
          to={`/notice/${data.id}`}
          key={`notice-list-${index + 1}`}
          className="notice-list"
        >
          <div className="notice-info">
            <div className="notice-list-title">
              {/* <div
                className={`notice-status ${
                  data.noticeStatus === "이벤트" ? "notice-event" : ""
                }`}
              >
                {data.noticeStatus}
              </div> */}
              <div>{data.title}</div>
            </div>
            <div className="notice-date">{shortDateDot(data)}</div>
          </div>
          <ReactSVG src={svgCollection.prev} className="notice-list-img" />
        </Link>
      ))}
    </div>
  );
};

export default NoticeList;
