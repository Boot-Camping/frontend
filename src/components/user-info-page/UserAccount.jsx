import React from "react";
import { userInfoIcon, userProfile } from "../../constants/userInfo";
import { ReactSVG } from "react-svg";

const UserAccount = () => {
  return (
    <div className="user-account-wrap profile-txt-wrap underline">
      <div className="user-account profile-txt">
        <div>아이디</div>
        <div>{userProfile.loginId}</div>
      </div>
      <div className="user-account profile-txt">
        <div>비밀번호</div>
        <div>
          <div>*******</div>
          <ReactSVG src={userInfoIcon.change} className="info-change-img" />
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
