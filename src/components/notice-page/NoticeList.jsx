import React from "react";
import "./NoticeList.css";
import { Link } from "react-router-dom";
import { shortDateDot } from "../../utils/shortDateDot";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import EmptyContent from "../common/EmptyContent";

const NoticeList = ({
  noticeData,
	errorMessage,
  linkPrefix = "/notice",
  svgSrc = svgCollection.prev,
}) => {
  return (
    <div className="notice-list-wrap">
      {noticeData.length > 0 ? (
				noticeData.map((data, index) => (
        <Link
          to={`${linkPrefix}/${data.id}`}
          key={`notice-list-${index + 1}`}
          className="notice-list"
        >
          <div className="notice-info">
            <div className="notice-list-title">
              <div>{data.title}</div>
            </div>
            <div className="notice-date">{shortDateDot(data)}</div>
          </div>
          <ReactSVG src={svgSrc} className="notice-list-img" />
        </Link>
      ))
		) : (
			<EmptyContent errorMessage={errorMessage} />
		)}
    </div>
  );
};

export default NoticeList;
