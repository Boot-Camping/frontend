import React from "react";
import "./UserProfile.css";

const UserProfile = ({ setIsOpened, setModalType, userData }) => {
  const changeHandle = (type) => {
    setIsOpened(true);
    setModalType(type);
  };

  const renderProfileItem = (label, value, onClick) => {
    return (
      <div
        className={`profile-txt ${onClick ? "profile-change-btn" : ""}`}
        onClick={onClick}
      >
        <div>{label}</div>
        <div>
          {value}
          {onClick && <div className="profile-change">변경</div>}
        </div>
      </div>
    );
  };

  const addrParts = userData.addr.match(/(.*?)(\s+\d+\s+)(.+)$/);
  const address = addrParts ? addrParts[1].trim() : userData.addr;
  const detailAddress = addrParts ? addrParts[3].trim() : "";

  return (
    <div className="user-profile-wrap">
      <div className="profile-txt-wrap underline">
        {renderProfileItem("이름", userData.name)}
        {renderProfileItem("전화번호", userData.tel, () => changeHandle("tel"))}
        {renderProfileItem("이메일", userData.email)}
        {renderProfileItem(
          "주소",
          addrParts ? (
            <div className="user-profile-full">
              <div>{address}</div>
              <div>{detailAddress}</div>
            </div>
          ) : (
            userData.addr
          ),
          () => changeHandle("addr")
        )}
      </div>
    </div>
  );
};

export default UserProfile;
