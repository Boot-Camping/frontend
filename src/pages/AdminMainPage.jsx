import React, { useState } from "react";
import "../css/AdminMainPage.css";

const AdminMainPage = () => {
  const [focusedButton, setFocusedButton] = useState(null);

  const handleFocus = (button) => {
    setFocusedButton(button);
  };

  const handleBlur = () => {
    setFocusedButton(null);
  };

  return (
    <div>
      <div className="capmingTitle">캠핑지</div>
      <div className="topBtn">
        <button className="campingRegisterBtn">+ 등록</button>
        <button className="campingCorrectBtn">수정</button>
      </div>
      <div className="staticsTitle">통계</div>
      <div className="staticsCategory">
        <button
          className="staticsCategorySite"
          onFocus={() => handleFocus("site")}
          onBlur={handleBlur}
        >
          사이트
        </button>
        <button
          className="staticsCategoryUser"
          onFocus={() => handleFocus("user")}
          onBlur={handleBlur}
        >
          회원 관리
        </button>
        <button
          className="staticsCategoryReview"
          onFocus={() => handleFocus("review")}
          onBlur={handleBlur}
        >
          리뷰 관리
        </button>
        <button
          className="staticsCategorySale"
          onFocus={() => handleFocus("sale")}
          onBlur={handleBlur}
        >
          매출
        </button>
      </div>
      {focusedButton === "site" && (
        <div className="imageContainer">
          <img src="assets/Site.png" alt="Site image" />
        </div>
      )}
      <div className="notiTitle">공지사항</div>
      <div className="topBtn">
        <button className="notiRegisterBtn">+ 등록</button>
        <button className="notiCorrectBtn">수정</button>
      </div>
      <div className="reserveTitle">예약</div>
      <div className="topBtn">
        <button className="reserveSeeBtn">조회</button>
      </div>
    </div>
  );
};

export default AdminMainPage;
