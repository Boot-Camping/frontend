import React, { useEffect, useRef, useState } from "react";
import "./UserInfoModal.css";
import { ReactSVG } from "react-svg";
import { closeModal } from "../../utils/closeModal";
import DaumPostCode from "../common/DaumPostCode";
import useAddress from "../../hooks/useAddress";
import UserInfoModalBtn from "./UserInfoModalBtn";
import { svgCollection } from "../../constants/svgCollection";
import { userInfoModal } from "../../constants/userInfo";
import PortalModal from "../common/PortalModal";
import { phoneNumber } from "../../utils/phoneNumber";
import EmptyContent from "../common/EmptyContent";

const UserInfoModal = ({
  isOpened,
  setIsOpened,
  modalType,
  tel,
  addr,
  onUpdate,
}) => {
  const { postcode, setPostcode } = useAddress();
  const addressRef = useRef(null);
  const detailAddressRef = useRef(null);
  const [inputValue, setInputValue] = useState({
    tel: "",
    addr: "",
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changeHandle = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const addrChangeHandle = () => {
    return new Promise((resolve) => {
      const formData = new FormData();
      formData.append("postcode", postcode);
      formData.append("address", addressRef.current.value);
      formData.append("detailAddress", detailAddressRef.current.value);
      console.log(formData.get("detailAddress"));

      const fullAddress = `(${formData.get("postcode")}) ${formData.get(
        "address"
      )} ${formData.get("detailAddress")}`;
      console.log(fullAddress);

      setInputValue((prev) => ({ ...prev, addr: fullAddress }));
      resolve(fullAddress);
    });
  };

  const renderOldData = () => {
    if (modalType === "password") {
      return (
        <input
          type="text"
          name="oldPassword"
          placeholder="비밀번호 입력"
          onChange={changeHandle}
        />
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
        return (
          <input
            type="text"
            name="tel"
            placeholder="010-1234-5678"
            onChange={changeHandle}
            onInput={(e) => phoneNumber(e)}
          />
        );
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
            <input
              type="text"
              name="newPassword"
              placeholder="비밀번호 확인"
              onChange={changeHandle}
            />
          </>
        );
      default:
        return <input type="text" placeholder="기본 입력" />;
    }
  };

  return (
    <>
      {isOpened && (
        <PortalModal setIsOpened={setIsOpened}>
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

            {errorMessage && (
              <EmptyContent errorMessage={errorMessage} error={error} />
            )}

            <UserInfoModalBtn
              setIsOpened={setIsOpened}
              modalType={modalType}
              inputValue={inputValue}
              addrChangeHandle={addrChangeHandle}
              onUpdate={onUpdate}
              setError={setError}
              setErrorMessage={setErrorMessage}
            />

            <ReactSVG
              src={svgCollection.xMark}
              className="info-modal-close"
              onClick={closeModal(setIsOpened)}
            />
          </div>
        </PortalModal>
      )}
    </>
  );
};

export default UserInfoModal;
