import React from "react";
import "./PaidListItem.css";
import { shortPeriodHyphen } from "../../utils/shortPeriodHyphen";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";

const PaidListItem = ({ data, onClickCancel, onClickReview }) => {
  const renderActionButton = (data) => {
    return data.bookStatus === "BOOKING"
      ? renderCancelButton(data)
      : renderReviewButton(data);
  };

  const renderCancelButton = (data) => (
    <button onClick={() => onClickCancel(data)}>
      <ReactSVG src={svgCollection.xMark} className="paid-list-img" />
      예약 취소
    </button>
  );

  const renderReviewButton = (data) => (
    <button onClick={() => onClickReview(data)}>
      <ReactSVG src={svgCollection.pencilSquare} className="paid-list-img" />
      리뷰 작성
    </button>
  );

  const getStatusText = (status) => {
    switch (status) {
      case "BOOKING":
        return "예약 완료";
      case "DECIDE":
        return "이용 완료";
      case "CANCEL":
        return "예약 취소";
      default:
        return "";
    }
  };

  return (
    <div
      className={`paid-list ${
        data.bookStatus === "BOOKING"
          ? "book-list"
          : data.bookStatus === "DECIDE"
          ? "usage-list"
          : "cancel-list"
      } `}
    >
      <div className="paid-list-status">
        <div className="paid-status">{getStatusText(data.bookStatus)}</div>
        <div className="paid-period">
          <span>{shortPeriodHyphen(data)}</span>
        </div>
      </div>
      <div className="paid-list-price">
        <div>{data.campName}</div>
        <div>{data.totalPrice.toLocaleString()}원</div>
      </div>
      <div className="paid-list-personnel">총 {data.bookNum}명</div>
      <div className="paid-list-request">
        <div>
          {data.bookRequest === "" ? "요청사항이 없습니다" : "요청사항"}
        </div>
        <div>{data.bookRequest}</div>
      </div>
      <div className="paid-list-btn">{renderActionButton(data)}</div>
    </div>
  );
};

export default PaidListItem;
