import React from "react";
import { userInfoIcon, userProfile } from "../../constants/userInfo";
import { ReactSVG } from "react-svg";

const UserAccount = ({ setIsOpened, setModalType }) => {
  const pwChangeHandle = () => {
    setIsOpened(true);
    setModalType("password");
    console.log("비밀번호 변경");
  };

  return (
    <div className="user-account-wrap profile-txt-wrap underline">
      <div className="user-account profile-txt">
        <div>아이디</div>
        <div>{userProfile.loginId}</div>
      </div>
      <div className="user-account profile-txt" onClick={pwChangeHandle}>
        <div>비밀번호</div>
        <div>
          <div>*******</div>
          <div className="profile-change">변경</div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
