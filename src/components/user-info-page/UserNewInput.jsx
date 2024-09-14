import React from "react";
import DaumPostCode from "../common/DaumPostCode";
import { phoneNumber } from "../../utils/phoneNumber";

const UserNewInput = ({
  modalType,
  changeInputHandle,
  addressRef,
  detailAddressRef,
  postcode,
  setPostcode,
}) => {
  switch (modalType) {
    case "tel":
      return (
        <input
          type="text"
          name="tel"
          placeholder="010-1234-5678"
          onChange={changeInputHandle}
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
            name="newPassword"
            placeholder="알파벳 대문자 및 특수문자를 포함한 8자 이상"
            onChange={changeInputHandle}
          />
          <input
            type="text"
            name="newPasswordChk"
            placeholder="비밀번호 확인"
            onChange={changeInputHandle}
          />
        </>
      );
    default:
      return <input type="text" placeholder="기본 입력" />;
  }
};

export default UserNewInput;
