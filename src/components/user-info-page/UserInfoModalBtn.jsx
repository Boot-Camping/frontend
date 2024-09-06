import React from "react";
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

  const validateInput = () => {
    if (modalType === "tel" && !inputValue.tel) {
      return "전화번호를 입력해주세요";
    }
    if (modalType === "password") {
      if (!inputValue.oldPassword) return "기존 비밀번호를 입력해주세요";
      if (!inputValue.newPassword) return "새 비밀번호를 입력해주세요";
      if (!inputValue.newPasswordChk)
        return "새 비밀번호를 한번 더 입력해주세요";
      if (inputValue.newPassword !== inputValue.newPasswordChk)
        return "새 비밀번호가 일치하지 않습니다";
    }
    return null;
  };

  const getBodyOrParams = async () => {
    const params = new URLSearchParams();
    let body;

    if (modalType === "tel") {
      params.set("tel", inputValue.tel);
    } else if (modalType === "addr") {
      const fullAddress = await addrChangeHandle();
      params.set("addr", fullAddress);
    } else if (modalType === "password") {
      body = {
        oldPassword: inputValue.oldPassword,
        newPassword: inputValue.newPassword,
      };
    }

    return { params, body };
  };

  const submitHandle = async () => {
    const message = validateInput();
    if (message) {
      setError(true);
      setErrorMessage(`Message: ${message}`);
      return;
    }

    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    if (modalType !== "password") {
      customHeaders["Content-Type"] = "application/x-www-form-urlencoded";
    }

    try {
      const { params, body } = await getBodyOrParams();
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
