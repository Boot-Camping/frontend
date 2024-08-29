import React, { useState } from "react";
import "./PaidList.css";
import { svgCollection } from "../../constants/svgCollection";
import { ReactSVG } from "react-svg";
import { filterData } from "../../utils/filterData";
import EmptyContent from "../common/EmptyContent";
import { shortPeriodHyphen } from "../../utils/shortPeriodHyphen";
import { useNavigate } from "react-router-dom";
import CancelBookingModal from "./CancelBookingModal";

const PaidList = ({
  filter,
  paidData,
  errorMessage,
  setErrorMessage,
  onUpdate,
}) => {
  const navigate = useNavigate();
  const filteredData = filterData(paidData, filter, "bookStatus");
  const [isOpened, setIsOpened] = useState(false);
  const [bookId, setBookId] = useState("");

  const reviewClickHandle = (data) => {
    navigate("/mypage/review", { state: { reviewData: data } });
  };

  const cancelClickHandle = (data) => {
    setBookId(data.bookId);
    setIsOpened(true);
  };

  const renderButton = (data, index) => {
    if (data.bookStatus === "BOOKING") {
      return (
        <button onClick={() => cancelClickHandle(data)}>
          <ReactSVG src={svgCollection.xMark} className="paid-list-img" />
          예약 취소
        </button>
      );
    } else {
      return (
        <button onClick={() => reviewClickHandle(data)}>
          <ReactSVG
            src={svgCollection.pencilSquare}
            className="paid-list-img"
          />
          리뷰 작성
        </button>
      );
    }
  };

  return (
    <>
      <div className="paid-list-wrap">
        {paidData.length > 0 && filteredData.length > 0 ? (
          filteredData.map((data, index) => (
            <div
              className={`paid-list ${
                data.bookStatus === "BOOKING"
                  ? "book-list"
                  : data.bookStatus === "DECIDE"
                  ? "usage-list"
                  : "cancel-list"
              } `}
              key={`paid-list-${index}`}
            >
              <div className="paid-list-status">
                <div className="paid-status">
                  {data.bookStatus === "BOOKING"
                    ? "예약 완료"
                    : data.bookStatus === "DECIDE"
                    ? "이용 완료"
                    : "예약 취소"}
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

      <CancelBookingModal
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        bookId={bookId}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default PaidList;
