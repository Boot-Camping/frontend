import React from "react";

const UserOldData = ({modalType, tel, addr, changeInputHandle}) => {
  if (modalType === "password") {
    return (
      <input
        type="text"
        name="oldPassword"
        placeholder="비밀번호 입력"
        onChange={changeInputHandle}
      />
    );
  } else if (modalType === "tel") {
    return <div>{tel}</div>;
  } else if (modalType === "addr") {
    return <div>{addr}</div>;
  }
};

export default UserOldData;
