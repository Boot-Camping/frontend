import React from "react";
import "./BookPage.css";
import { useState, useEffect } from "react";
import { get } from "../../utils/Api";

const BookInfo = () => {
  const [bookInfo, setBookInfo] = useState(null);
  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const response = await get("camp/21");
        setBookInfo(response);
      } catch (error) {
        console.error("캠핑장 정보 가져오기 실패:", error);
      }
    };
    fetchBookInfo();
  }, []);

  if (!bookInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="book-info">
        <div className="book-contents">
          <div className="camping-name">캠핑장 정보</div>
          <div className="camping-num">
            {bookInfo.name}
            <br />
            기준 수용인원: {bookInfo.standardNum} 명 <br />
            최대 수용인원: {bookInfo.maxNum} 명 <br />
            1박 가격: {bookInfo.price.toLocaleString()} 원<br />
            초과 인원당 추가비용: {bookInfo.overCharge.toLocaleString()} 원
          </div>
        </div>
        <img className="book-img" src={bookInfo.imageUrls[0]} alt="" />
      </div>
    </div>
  );
};

export default BookInfo;
