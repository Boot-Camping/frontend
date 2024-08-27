import React, { useRef } from "react";
import "./UserInfoModal.css";
import { userInfoModal } from "../../constants/userInfo";
import { ReactSVG } from "react-svg";
import { createPortal } from "react-dom";
import { closeModal } from "../../utils/closeModal";
import DaumPostCode from "../common/DaumPostCode";
import useAddress from "../../hooks/useAddress";
import UserInfoModalBtn from "./UserInfoModalBtn";
import { svgCollection } from "../../constants/svgCollection";

const UserInfoModal = ({ isOpened, setIsOpened, modalType, tel, addr }) => {
  const { postcode, setPostcode } = useAddress();
  const addressRef = useRef(null);
  const detailAddressRef = useRef(null);

  const renderOldData = () => {
    if (modalType === "password") {
      return (
        <input type="text" name="oldPassword" placeholder="비밀번호 입력" />
      );
    } else if (modalType === "tel") {
      return <div>{tel}</div>;
    } else if (modalType === "addr") {
      return <div>{addr}</div>;
    }
  };

  const renderNewInput = () => {
    switch (modalType) {
      case "tel":
        return <input type="text" name="tel" placeholder="010-1234-5678" />;
      case "addr":
        return (
          <DaumPostCode
            postcode={postcode}
            setPostcode={setPostcode}
            addressRef={addressRef}
            detailAddressRef={detailAddressRef}
          />
        );
      case "password":
        return (
          <>
            <input
              type="text"
              placeholder="알파벳 대문자 및 특수문자를 포함한 8자 이상"
            />
            <input type="text" name="newPassword" placeholder="비밀번호 확인" />
          </>
        );
      default:
        return <input type="text" placeholder="기본 입력" />;
    }
  };

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
                modalType === "addr" ? `info-modal-addr` : ""
              } ${modalType === "password" ? `info-modal-pw` : ""}`}
            >
              <div className="info-modal-title">
                {userInfoModal[modalType].title}
              </div>
              <div className="info-modal-old info-modal-data">
                <div>{userInfoModal[modalType].old}</div>
                {renderOldData()}
              </div>
              <div className="info-modal-new info-modal-data">
                <div>{userInfoModal[modalType].new}</div>
                {renderNewInput()}
              </div>

              <UserInfoModalBtn
                setIsOpened={setIsOpened}
                modalType={modalType}
              />

              <ReactSVG
                src={svgCollection.xMark}
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
