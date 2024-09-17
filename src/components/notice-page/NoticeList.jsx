import React from "react";
import "./NoticeList.css";
import { svgCollection } from "../../constants/svgCollection";
import EmptyContent from "../common/EmptyContent";
import NoticeListItem from "./NoticeListItem";

const NoticeList = ({
  noticeData,
  errorMessage,
  linkPrefix = "/notice",
  svgSrc = svgCollection.prev,
}) => {
  return (
    <div className="notice-list-wrap">
      {noticeData.length > 0 ? (
        noticeData.map((data) => (
          <NoticeListItem
            key={`notice-list${data.id}`}
            data={data}
            linkPrefix={linkPrefix}
            svgSrc={svgSrc}
          />
        ))
      ) : (
        <EmptyContent errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default NoticeList;
