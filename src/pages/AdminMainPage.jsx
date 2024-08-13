import React from "react";
import "../css/AdminMainPage.css";

const AdminMainPage = () => {
  return (
    <div>
      <div className="capmingTitle">캠핑지</div>
      <div className="topBtn">
        <button className="campingRegisterBtn">+ 등록</button>
        <button className="campingCorrectBtn">수정</button>
      </div>
      <div className="staticsTitle">통계</div>
      <div className="staticsCategory">
        <button className="staticsCategorySite">사이트</button>
        <button className="staticsCategoryUser">회원 관리</button>
        <button className="staticsCategoryReview">리뷰 관리</button>
        <button className="staticsCategorySale">매출</button>
      </div>
    </div>
  );
};

export default AdminMainPage;
