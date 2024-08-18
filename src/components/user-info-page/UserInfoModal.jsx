import React, { useRef } from "react";
import "../user-info-page/UserInfoModal.css";
import {
  userInfoIcon,
  userInfoModal,
  userOldData,
} from "../../constants/userInfo";
import { ReactSVG } from "react-svg";
import { createPortal } from "react-dom";
import { closeModal } from "../../utils/closeModal";
import DaumPostCode from "../sign-up-page/DaumPostCode";
import useAddress from "../../hooks/useAddress";

const UserInfoModal = ({ isOpened, setIsOpened, modalType }) => {
  const { postcode, setPostcode } = useAddress();
  const addressRef = useRef(null);
  const detailAddressRef = useRef(null);

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
    <>
      {isOpened && (
        <>
          {createPortal(
            <div className="overlay" onClick={closeModal(setIsOpened)}></div>,
            document.getElementById("overlay-root")
          )}
          {createPortal(
            <div
              className={`user-info-modal modal ${
                modalType === "addr" && `info-modal-addr`
              }`}
            >
              <div className="info-modal-title">
                {userInfoModal[modalType].title}
              </div>
              <ul className="info-modal-old info-modal-data">
                <li>{userInfoModal[modalType].old}</li>
                <li>{userOldData[modalType]}</li>
              </ul>
              <div className="info-modal-new info-modal-data">
                <div>{userInfoModal[modalType].new}</div>
                {modalType !== "addr" ? (
                  <input type="text" />
                ) : (
                  <DaumPostCode
                    postcode={postcode}
                    setPostcode={setPostcode}
                    addressRef={addressRef}
                    detailAddressRef={detailAddressRef}
                  />
                )}
              </div>

              <button
                className="info-modal-submit"
                onClick={closeModal(setIsOpened)}
              >
                <ReactSVG
                  src={userInfoModal[modalType].icon}
                  className="info-modal-img"
                />
                <span>변경 완료</span>
              </button>

              <ReactSVG
                src={userInfoIcon.xMark}
                className="info-modal-close"
                onClick={closeModal(setIsOpened)}
              />
            </div>,
            document.getElementById("modal-root")
          )}
        </>
      )}
    </>
  );
};

export default UserInfoModal;
