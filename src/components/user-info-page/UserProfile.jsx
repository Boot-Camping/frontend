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

  const addrParts = userProfile.addr.match(/(.*?)(\s+\d+\s+)(.+)$/);
  const address = addrParts[1].trim();
  const detailAddress = addrParts[3].trim();

  return (
    <div className="user-profile-wrap">
      <div className="profile-img-wrap underline">
        <div className="profile-img">
          <input type="file" id="profile-img-input" />
          <label htmlFor="profile-img-input">
            <ReactSVG
              src={userProfile.userImage}
              className="profile-img-user"
            />
            <ReactSVG src={userInfoIcon.photo} className="profile-img-photo" />
          </label>
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
            <div className="profile-change">변경</div>
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
              <div>{address}</div>
              <div>{detailAddress}</div>
            </div>
            <div className="profile-change">변경</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
