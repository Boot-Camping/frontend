import React, { useState } from "react";
import "./PaidList.css";
import { filterData } from "../../utils/filterData";
import EmptyContent from "../common/EmptyContent";
import { useNavigate } from "react-router-dom";
import CancelBookingModal from "./CancelBookingModal";
import PaidListItem from "./PaidListItem";

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

  const hasData = paidData.length > 0 && filteredData.length > 0;

  const clickReviewHandle = (data) => {
    navigate("/mypage/review", { state: { reviewData: data } });
  };

  const clickCancelHandle = (data) => {
    setBookId(data.bookId);
    setIsOpened(true);
  };

  return (
    <>
      <div className="paid-list-wrap">
        {hasData ? (
          filteredData.map((data) => (
            <PaidListItem
              key={`paid-list-${data.bookId}`}
              data={data}
              onClickCancel={() => clickCancelHandle(data)}
              onClickReview={() => clickReviewHandle(data)}
            />
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
