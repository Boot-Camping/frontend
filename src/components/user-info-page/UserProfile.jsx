import React from "react";
import "./UserProfile.css";

const UserProfile = ({
  setIsOpened,
  setModalType,
  userData,
}) => {

  const telChangeHandle = () => {
    setIsOpened(true);
    setModalType("tel");
  };

  const addrChangeHandle = () => {
    setIsOpened(true);
    setModalType("addr");
  };

  const addrParts = userData.addr.match(/(.*?)(\s+\d+\s+)(.+)$/);
  const address = addrParts ? addrParts[1].trim() : userData.addr;
  const detailAddress = addrParts ? addrParts[3].trim() : "";

  return (
    <div className="user-profile-wrap">
      <div className="profile-txt-wrap underline">
        <div className="profile-txt">
          <div>이름</div>
          <div>{userData.name}</div>
        </div>
        <div className="profile-txt profile-change-btn" onClick={telChangeHandle}>
          <div>전화번호</div>
          <div>
            <div>{userData.tel}</div>
            <div className="profile-change">변경</div>
          </div>
        </div>
        <div className="profile-txt">
          <div>이메일</div>
          <div>{userData.email}</div>
        </div>
        <div className="profile-txt profile-address profile-change-btn" onClick={addrChangeHandle}>
          <div className="">주소</div>
          <div>
            {addrParts ? (
              <div className="user-profile-full">
                <div>{address}</div>
                <div>{detailAddress}</div>
              </div>
            ) : (
              <div>{userData.addr}</div>
            )}
            <div className="profile-change">변경</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
