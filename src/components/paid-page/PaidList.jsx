import React from "react";
import "./PaidList.css";
import { paidIcon } from "../../constants/paid";
import { ReactSVG } from "react-svg";
import { filterData } from "../../utils/filterData";
import EmptyContent from "./EmptyContent";

const PaidList = ({ filter, paidData, errorMessage }) => {
  const filteredData = filterData(paidData, filter, "bookStatus");

  const renderButton = (data, index) => {
    if (data.bookStatus === "예약 완료") {
      return (
        <button>
          <ReactSVG src={paidIcon.cancel} className="paid-list-img" />
          예약 취소
        </button>
      );
    } else {
      return (
        <button>
          <ReactSVG src={paidIcon.write} className="paid-list-img" />
          리뷰 작성
        </button>
      );
    }
  };

  return (
    <div className="paid-list-wrap">
      {paidData.length > 0 ? (
        <>
          {filteredData.map((data, index) => (
            <div
              className={`paid-list ${
                data.bookStatus === "예약 완료" ? "book-list" : "usage-list"
              } `}
              key={`paid-list-${index}`}
            >
              <div className="paid-list-status">
                <div className="paid-status">{data.bookStatus}</div>
                <div className="paid-period">
                  <span>{data.startDate}</span> ~ <span>{data.endDate}</span>
                </div>
              </div>
              <div className="paid-list-price">
                <div>{data.campName}</div>
                <div>{data.totalPrice.toLocaleString()}원</div>
              </div>
              <div className="paid-list-personnel">총 {data.bookNum}명</div>
              <div className="paid-list-request">
                <div>요청 사항</div>
                <div>{data.bookRequest}</div>
              </div>
              <div className="paid-list-btn">{renderButton(data, index)}</div>
            </div>
          ))}
        </>
      ) : (
        <EmptyContent errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default PaidList;
