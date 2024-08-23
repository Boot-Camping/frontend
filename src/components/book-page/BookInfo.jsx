import React from "react";
import "./BookPage.css";
import useCampInfo from "../../hooks/useCampInfo";

const BookInfo = () => {
  const campId = 21;
  const { campInfo, loading, error } = useCampInfo(campId, "campInfo");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>캠핑장 정보 가져오기 실패: {error.message}</div>;
  }
  return (
    <div>
      <div className="book-info">
        <div className="book-contents">
          <div className="camping-name">캠핑장 정보</div>
          <div className="camping-num">
            {campInfo.name}
            <br />
            기준 수용인원: {campInfo.standardNum} 명 <br />
            최대 수용인원: {campInfo.maxNum} 명 <br />
            1박 가격: {campInfo.price.toLocaleString()} 원<br />
            초과 인원당 추가비용: {campInfo.overCharge.toLocaleString()} 원
          </div>
        </div>
        <img className="book-img" src={campInfo.imageUrls[0]} alt="" />
      </div>
    </div>
  );
};

export default BookInfo;
