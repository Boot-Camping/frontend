import React from "react";
import "./UserInfoModalBtn.css";
import { userInfoModal } from "../../constants/userInfo";
import { ReactSVG } from "react-svg";
import useUpdateUserInfo from "../../hooks/useUpdateUserInfo";

const UserInfoModalBtn = ({
  setIsOpened,
  modalType,
  inputValue,
  onUpdate,
  addrChangeHandle,
  setError,
  setErrorMessage,
  setPostcode,
  resetInputValue,
}) => {
  const { putUserInfo } = useUpdateUserInfo(
    setIsOpened,
    onUpdate,
    setPostcode,
    setError,
    setErrorMessage
  );

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
    const validationMessage = validateInput();
    if (validationMessage) {
      setError(true);
      setErrorMessage(`Message: ${validationMessage}`);
      return;
    }

    const { params, body } = await getBodyOrParams();
    await putUserInfo(modalType, params, body);

    resetInputValue();
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
