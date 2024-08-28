import React, { useState } from "react";
import "./UserInfoModalBtn.css";
import { closeModal } from "../../utils/closeModal";
import { userInfoModal } from "../../constants/userInfo";
import { ReactSVG } from "react-svg";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { put } from "../../utils/api";

const UserInfoModalBtn = ({
  setIsOpened,
  modalType,
  inputValue,
  onUpdate,
  addrChangeHandle,
}) => {
  const { accessToken } = getUserIdFromToken();
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandle = async () => {
    const customHeaders = {
      Authorization: `${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const params = new URLSearchParams();

    if (modalType === "tel") {
      params.set("tel", inputValue.tel);
    } else if (modalType === "addr") {
      const fullAddress = await addrChangeHandle();
      console.log("fullAddress", fullAddress);
      params.set("addr", fullAddress);
    } else if (modalType === "password") {
      params.oldPassword = inputValue.oldPassword;
      params.newPassword = inputValue.newPassword;
    }

    try {
      const response = await put(
        `userprofile`,
        params.toString(),
        customHeaders
      );
      console.log("response", response);
      console.log("params", params.toString());
      setIsOpened(false);
      closeModal(setIsOpened)();
      onUpdate();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <button className="info-modal-submit" onClick={submitHandle}>
      <ReactSVG
        src={userInfoModal[modalType].icon}
        className="info-modal-img"
      />
      <span>변경 완료</span>
    </button>
  );
};

export default UserInfoModalBtn;
