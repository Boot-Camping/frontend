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
  setError,
  setErrorMessage,
}) => {
  const { accessToken } = getUserIdFromToken();

  const submitHandle = async () => {
    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    if (modalType !== "password") {
      customHeaders["Content-Type"] = "application/x-www-form-urlencoded";
    }

    const params = new URLSearchParams();
    let body;

    if (modalType === "tel") {
      params.set("tel", inputValue.tel);
    } else if (modalType === "addr") {
      const fullAddress = await addrChangeHandle();
      console.log("fullAddress", fullAddress);
      params.set("addr", fullAddress);
    } else if (modalType === "password") {
      body = {
        oldPassword: inputValue.oldPassword,
        newPassword: inputValue.newPassword,
      };
    }
    console.log(body);

    try {
      const endpoint =
        modalType === "password" ? "userprofile/password" : "userprofile";
      const response = await put(
        endpoint,
        modalType === "password" ? JSON.stringify(body) : params.toString(),
        customHeaders
      );
      console.log("response", response);
      console.log("params", params.toString());
      setIsOpened(false);
      closeModal(setIsOpened)();
      setError(false);
      setErrorMessage(null);
      onUpdate();
    } catch (error) {
      setErrorMessage(error.message);
      setError(true);
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
