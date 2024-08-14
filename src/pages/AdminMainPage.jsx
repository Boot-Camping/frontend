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
      <div className="capming-title">캠핑지</div>
      <div className="top-btn">
        <button className="camping-register-btn">+ 등록</button>
        <button className="camping-correct-btn">수정</button>
      </div>
      <div className="statics-title">통계</div>
      <div className="statics-category">
        <button
          className="statics-category-site"
          onFocus={() => handleFocus("site")}
          onBlur={handleBlur}
        >
          사이트
        </button>
        <button
          className="statics-category-user"
          onFocus={() => handleFocus("user")}
          onBlur={handleBlur}
        >
          회원 관리
        </button>
        <button
          className="statics-category-review"
          onFocus={() => handleFocus("review")}
          onBlur={handleBlur}
        >
          리뷰 관리
        </button>
        <button
          className="statics-category-sale"
          onFocus={() => handleFocus("sale")}
          onBlur={handleBlur}
        >
          매출
        </button>
      </div>
      {focusedButton === "site" && (
        <div className="image-container">
          <img src="assets/Site.png" alt="Site image" />
        </div>
      )}
      <div className="noti-title">공지사항</div>
      <div className="top-btn">
        <button className="noti-register-btn">+ 등록</button>
        <button className="noti-correct-btn">수정</button>
      </div>
      <div className="reserve-title">예약</div>
      <div className="top-btn">
        <button className="reserve-see-btn">조회</button>
      </div>
    </div>
  );
};

export default AdminMainPage;
