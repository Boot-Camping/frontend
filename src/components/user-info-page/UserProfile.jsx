import React from "react";
import "./UserProfile.css";
import { ReactSVG } from "react-svg";
import { userInfoIcon, userProfile } from "../../constants/userInfo";

const UserProfile = ({ setIsOpened, setModalType }) => {
  const telChangeHandle = () => {
    setIsOpened(true);
    setModalType("userTel");
    console.log("전화번호 변경");
  };

  const addrChangeHandle = () => {
    setIsOpened(true);
    setModalType("addr");
    console.log("주소 변경");
  };

  return (
    <div className="user-profile-wrap">
      <div className="profile-img-wrap underline">
        <div className="profile-img">
          <ReactSVG src={userProfile.userImage} className="profile-img-user" />
          <ReactSVG src={userInfoIcon.photo} className="profile-img-photo" />
        </div>
        <div>{userProfile.loginId}</div>
      </div>
      <div className="profile-txt-wrap underline">
        <div className="profile-txt">
          <div>이름</div>
          <div>{userProfile.userName}</div>
        </div>
        <div className="profile-txt" onClick={telChangeHandle}>
          <div>전화번호</div>
          <div>
            <div>{userProfile.userTel}</div>
            <ReactSVG src={userInfoIcon.change} className="info-change-img" />
          </div>
        </div>
        <div className="profile-txt">
          <div>이메일</div>
          <div>{userProfile.email}</div>
        </div>
        <div className="profile-txt profile-address" onClick={addrChangeHandle}>
          <div className="">주소</div>
          <div>
            <div>
              <div>{userProfile.addr.address}</div>
              <div>{userProfile.addr.detailAddress}</div>
            </div>
            <ReactSVG src={userInfoIcon.change} className="info-change-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
