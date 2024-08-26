import React from "react";
import "./PaidList.css";
import { paidIcon } from "../../constants/paid";
import { ReactSVG } from "react-svg";
import { filterData } from "../../utils/filterData";
import EmptyContent from "./EmptyContent";
import { shortPeriodHyphen } from "../../utils/shortPeriodHyphen";
import { useNavigate } from "react-router-dom";

const PaidList = ({ filter, paidData, errorMessage }) => {
  const navigate = useNavigate();
  const filteredData = filterData(paidData, filter, "bookStatus");

  const reviewClickHandle = (data) => {
    navigate("/mypage/review", { state: { reviewData: data } });
  };

  const renderButton = (data, index) => {
    if (data.bookStatus === "BOOKING") {
      return (
        <button>
          <ReactSVG src={paidIcon.cancel} className="paid-list-img" />
          예약 취소
        </button>
      );
    } else {
      return (
        <button onClick={() => reviewClickHandle(data)}>
          <ReactSVG src={paidIcon.write} className="paid-list-img" />
          리뷰 작성
        </button>
      );
    }
  };

  return (
    <div className="paid-list-wrap">
      {paidData.length > 0 && filteredData.length > 0 ? (
        filteredData.map((data, index) => (
          <div
            className={`paid-list ${
              data.bookStatus === "BOOKING" ? "book-list" : "usage-list"
            } `}
            key={`paid-list-${index}`}
          >
            <div className="paid-list-status">
              <div className="paid-status">
                {data.bookStatus === "BOOKING" ? "예약 완료" : "이용 완료"}
              </div>
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
            <div className="paid-list-btn">{renderButton(data, index)}</div>
          </div>
        ))
      ) : (
        <EmptyContent errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default PaidList;
