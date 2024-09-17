import React from "react";
import "./UserProfile.css";

const UserProfile = ({ setIsOpened, setModalType, userData }) => {
  const changeModalHandle = (type) => {
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

  const extractAddressParts = (address) => {
    const addrParts = userData.addr.match(/(.*?)(\s+\d+\s+)(.+)$/);
    return addrParts
      ? {
          mainAddress: addrParts[1].trim(),
          detailAddress: addrParts[3].trim(),
        }
      : {
          mainAddress: address,
          detailAddress: "",
        };
  };

  const { mainAddress, detailAddress } = extractAddressParts(userData.addr);

  return (
    <div className="user-profile-wrap">
      <div className="profile-txt-wrap underline">
        {renderProfileItem("이름", userData.name)}
        {renderProfileItem("전화번호", userData.tel, () =>
          changeModalHandle("tel")
        )}
        {renderProfileItem("이메일", userData.email)}
        {renderProfileItem(
          "주소",
          <div className="user-profile-full">
            <div>{mainAddress}</div>
            <div>{detailAddress}</div>
          </div>,
          () => changeModalHandle("addr")
        )}
      </div>
    </div>
  );
};

export default UserProfile;
