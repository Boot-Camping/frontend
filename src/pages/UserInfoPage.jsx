import React from "react";
import "../components/user-info-page/UserInfoPage.css";
import "../components/user-info-page/UserProfile.css";
import UserProfile from "../components/user-info-page/UserProfile";
import UserAccount from "../components/user-info-page/UserAccount";
import { Link } from "react-router-dom";
import { userInfoIcon, userProfile } from "../constants/userInfo";
import { ReactSVG } from "react-svg";

const UserInfoPage = () => {
  return (
    <section className="user-info-wrap">
      <div className="user-info-title">
        <Link to={"/mypage"}>
          <ReactSVG src={userInfoIcon.prev} className="user-info-prev" />
        </Link>
        <div>내 정보 관리</div>
      </div>
      <UserProfile />
      <UserAccount />
      <Link to={"/cash"} className="user-cash-wrap">
        <div>캐시</div>
        <div>
          <div>{userProfile.cash}원</div>
          <ReactSVG src={userInfoIcon.prev} className="user-arrow-img" />
        </div>
      </Link>
    </section>
  );
};

export default UserInfoPage;
