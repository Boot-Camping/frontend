import React from "react";
import { Link } from "react-router-dom";

const MyPage = () => {
  return (
    <>
      <div>마이페이지</div>
      <Link to="/signup">회원가입</Link>
      <Link to="/login">로그인</Link>
      <Link to="/userinfo">내 정보 관리</Link>
      <Link to="/paid">결제 내역</Link>
      <Link to="/">나의 리뷰</Link>
      <Link to="/save">찜 목록</Link>
      <Link to="/cash">캐시 충전/사용</Link>
      <Link to="/notice">공지사항 및 이벤트</Link>
    </>
  );
};

export default MyPage;
