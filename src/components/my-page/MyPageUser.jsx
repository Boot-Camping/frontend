import React from "react";
import "./MyPageUser.css";
import { mypageImgs, myPageData } from "../../constants/mypage";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

const MyPageUser = () => {
  return (
    <div className="mypage-user">
      <div className="mypage-user-info">
        <ReactSVG src={mypageImgs.user} className="mypage-user-icon" />
        <div>{myPageData.loginId}</div>
      </div>
      <Link to="/userinfo" className="user-setting">
        <div>내 정보 관리</div>
        <ReactSVG src={mypageImgs.setting} className="mypage-setting-icon" />
      </Link>
    </div>
  );
};

export default MyPageUser;
