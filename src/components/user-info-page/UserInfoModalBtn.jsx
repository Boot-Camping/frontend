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
  setPostcode,
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
      if (!inputValue.tel) {
        setError(true);
        setErrorMessage("Message: 전화번호를 입력해주세요");
        return;
      }
      params.set("tel", inputValue.tel);
    } else if (modalType === "addr") {
      const fullAddress = await addrChangeHandle();
      params.set("addr", fullAddress);
    } else if (modalType === "password") {
      if (!inputValue.oldPassword) {
        setError(true);
        setErrorMessage("Message: 기존 비밀번호를 입력해주세요");
        return;
      } else if (!inputValue.newPassword) {
        setError(true);
        setErrorMessage("Message: 새 비밀번호를 입력해주세요");
        return;
      } else if (!inputValue.newPasswordChk) {
        setError(true);
        setErrorMessage("Message: 새 비밀번호를 한번 더 입력해주세요");
        return;
      } else if (inputValue.newPassword === inputValue.newPasswordChk) {
        body = {
          oldPassword: inputValue.oldPassword,
          newPassword: inputValue.newPassword,
        };
      } else {
        setError(true);
        setErrorMessage("Message: 새 비밀번호가 일치하지 않습니다");
        return;
      }
    }

    try {
      const endpoint =
        modalType === "password" ? "userprofile/password" : "userprofile";
      await put(
        endpoint,
        modalType === "password" ? JSON.stringify(body) : params.toString(),
        customHeaders
      );
      setIsOpened(false);
      closeModal(setIsOpened)();
      setError(false);
      setErrorMessage(null);
      setPostcode("");
      onUpdate();
    } catch (error) {
      setErrorMessage(error.message);
      setError(true);
      setPostcode("");
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
