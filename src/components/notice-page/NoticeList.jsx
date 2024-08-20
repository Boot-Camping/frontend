import React from "react";
import "./NoticeList.css";
import { noticeData } from "../../constants/notice";
import { Link } from "react-router-dom";
import { shortDateDot } from "../../utils/shortDateDot";

const NoticeList = () => {
  return (
    <div className="notice-list-wrap">
      {noticeData.map((data, index) => (
        <Link
          to={`/notice/${data.id}`}
          key={`notice-list-${index + 1}`}
          className="notice-list"
        >
          <div className="notice-info">
            <div
              className={`notice-status ${
                data.noticeStatus === "이벤트" ? "notice-event" : ""
              }`}
            >
              {data.noticeStatus}
            </div>
            <div>{data.title}</div>
          </div>
          <div className="notice-date">{shortDateDot(data)}</div>
        </Link>
      ))}
    </div>
  );
};

export default NoticeList;
