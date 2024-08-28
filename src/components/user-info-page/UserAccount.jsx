import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";

const UserAccount = ({ setIsOpened, setModalType, userData }) => {
  const pwChangeHandle = () => {
    setIsOpened(true);
    setModalType("password");
    console.log("비밀번호 변경");
  };

  return (
    <div className="user-account-wrap profile-txt-wrap underline">
      <div className="user-account profile-txt">
        <div>아이디</div>
        <div>{userData.loginId}</div>
      </div>
      <div className="user-account profile-txt" onClick={pwChangeHandle}>
        <div>비밀번호</div>
        <div>
          <div>*******</div>
          <div className="profile-change">변경</div>
        </div>
      </div>
      <Link
        to={"/user/delete"}
        className="user-account profile-txt user-account-delete"
      >
        <div>회원 탈퇴</div>
        <ReactSVG src={svgCollection.prev} />
      </Link>
    </div>
  );
};

export default UserAccount;
