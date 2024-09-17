import React from "react";
import "./MyPageUser.css";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import MyPageLogout from "./MyPageLogout";
import { svgCollection } from "../../constants/svgCollection";
import useMyPageUser from "../../hooks/useMyPageUser";

const MyPageUser = () => {
  const { userName, userImage, errorMessage, setErrorMessage } =
    useMyPageUser();

  const renderUserImage = () => {
    if (!userImage) {
      return (
        <ReactSVG src={svgCollection.userImg} className="mypage-user-icon" />
      );
    }
    return (
      <div className="mypage-user-icon">
        <img src={userImage} />
      </div>
    );
  };

  const renderUserInfo = () => (
    <div className="mypage-user-info">
      <div>{userName}</div>
      <Link to="/userinfo" className="user-setting">
        <div>내 정보 관리</div>
        <ReactSVG src={svgCollection.setting} className="mypage-setting-icon" />
      </Link>
    </div>
  );

  return (
    <div className="mypage-user-wrap">
      <div className="mypage-user">
        {renderUserImage()}
        {renderUserInfo()}
      </div>
      <MyPageLogout
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default MyPageUser;
