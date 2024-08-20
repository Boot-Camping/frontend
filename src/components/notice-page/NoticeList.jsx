import React from "react";
import "./NoticeList.css";
import { noticeData } from "../../constants/notice";

const NoticeList = () => {
  const shortDate = (data) => {
    const date = data.createdAt;
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="notice-list-wrap">
      {noticeData.map((data, index) => (
        <>
          <div key={`notice-list-${index + 1}`} className="notice-list">
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
            <div className="notice-date">{shortDate(data)}</div>
          </div>
        </>
      ))}
    </div>
  );
};

export default NoticeList;
