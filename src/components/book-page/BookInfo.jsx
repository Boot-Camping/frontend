import React from "react";
import "./BookPage.css";
import bookImage from "../../assets/image/detailImg-2.png";
import { useState, useEffect } from "react";
import { get } from "../../utils/Api";

const BookInfo = () => {
  const [detailInfo, setDetailInfo] = useState(null);
  useEffect(() => {
    const fetchCampInfo = async () => {
      try {
        const response = await get("camp/2");
        setDetailInfo(response);
      } catch (error) {
        console.error("캠핑장 정보 가져오기 실패:", error);
      }
    };
    fetchCampInfo();
  }, []);

  if (!detailInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="book-info">
        <div className="book-contents">
          <div className="camping-name">캠핑장 정보</div>
          <div className="camping-num">
            {detailInfo.name}
            <br />
            기준 수용인원: {detailInfo.standardNum} 명 <br />
            최대 수용인원: {detailInfo.maxNum} 명 <br />
            1박 가격: {detailInfo.price.toLocaleString()} 원<br />
            초과 인원당 추가비용: {detailInfo.overCharge.toLocaleString()} 원
          </div>
        </div>
        <img className="book-img" src={detailInfo.imageUrls[0]} alt="" />
      </div>
    </div>
  );
};

export default BookInfo;
