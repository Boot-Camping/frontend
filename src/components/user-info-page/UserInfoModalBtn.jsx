import React from "react";
import "./UserInfoModalBtn.css";
import { closeModal } from "../../utils/closeModal";
import { userInfoModal } from "../../constants/userInfo";
import { ReactSVG } from "react-svg";

const UserInfoModalBtn = ({ setIsOpened, modalType }) => {
  // const submitHandle = (event) => {
  //   event.preventDefault();

  //   if (postcode === "") {
  //     setError(true);
  //     setErrorType("post");
  //     setIsOpened(true);
  //     return;
  //   }

  //   setError(false); // 에러가 없으면 메시지 초기화
  //   setIsOpened(false);

  //   // 입력된 데이터를 formData에 저장
  //   const formData = {};
  //   signUp.forEach((signup) => {
  //     const inputElement = document.querySelector(
  //       `input[name="${signup.key}"]`
  //     );
  //     if (inputElement) {
  //       formData[signup.key] = inputElement.value;
  //     }
  //   });
  //   formData.addr = `(${postcode}) ${addressRef.current.value} ${detailAddressRef.current.value}`; // 주소는 별도로 처리

  //   // handleSubmit 호출
  //   handleSubmit(formData);

  //   console.log("제출 완료", formData);
  // };

  return (
    <button className="info-modal-submit" onClick={closeModal(setIsOpened)}>
      <ReactSVG
        src={userInfoModal[modalType].icon}
        className="info-modal-img"
      />
      <span>변경 완료</span>
    </button>
  );
};

export default UserInfoModalBtn;
