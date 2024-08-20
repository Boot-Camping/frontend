import React, { useState } from "react";
import "../components/user-info-page/UserInfoPage.css";
import UserProfile from "../components/user-info-page/UserProfile";
import UserAccount from "../components/user-info-page/UserAccount";
import { Link } from "react-router-dom";
import { userInfoIcon, userProfile } from "../constants/userInfo";
import { ReactSVG } from "react-svg";
import UserInfoModal from "../components/user-info-page/UserInfoModal";

const UserInfoPage = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [modalType, setModalType] = useState("");

  return (
    <section className="user-info-wrap">
      <div className="user-info-title">
        <Link to={"/mypage"}>
          <ReactSVG src={userInfoIcon.prev} className="user-info-prev" />
        </Link>
        <div>내 정보 관리</div>
      </div>
      <UserProfile setIsOpened={setIsOpened} setModalType={setModalType} />
      <UserAccount setIsOpened={setIsOpened} setModalType={setModalType} />
      <Link to={"/cash"} className="user-cash-wrap">
        <div>캐시</div>
        <div>
          <div>{userProfile.cash.toLocaleString()}원</div>
          <ReactSVG src={userInfoIcon.prev} className="user-arrow-img" />
        </div>
      </Link>

      <UserInfoModal
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        modalType={modalType}
      />
    </section>
  );
};

export default UserInfoPage;
