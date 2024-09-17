import React, { useRef, useState } from "react";
import "./UserInfoModal.css";
import { ReactSVG } from "react-svg";
import useAddress from "../../hooks/useAddress";
import UserInfoModalBtn from "./UserInfoModalBtn";
import { svgCollection } from "../../constants/svgCollection";
import { userInfoModal } from "../../constants/userInfo";
import PortalModal from "../common/PortalModal";
import EmptyContent from "../common/EmptyContent";
import UserOldData from "./UserOldData";
import UserNewInput from "./UserNewInput";
import { resetModal } from "../../utils/resetModal";

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
    newPasswordChk: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changeInputHandle = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const resetInputValue = () => {
    setInputValue({
      tel: "",
      addr: "",
      oldPassword: "",
      newPassword: "",
      newPasswordChk: "",
    });
  };

  const validateAddrFields = () => {
    if (postcode === "") {
      setError(true);
      setErrorMessage("Message: 주소를 입력해주세요");
      return false;
    }
    if (detailAddressRef.current.value === "") {
      setError(true);
      setErrorMessage("Message: 상세주소를 입력해주세요");
      return false;
    }
    return true;
  };

  const constructFullAddr = () => {
    const fullAddress = `(${postcode}) ${addressRef.current.value} ${detailAddressRef.current.value}`;

    setInputValue((prev) => ({ ...prev, addr: fullAddress }));
    return fullAddress;
  };

  const addrChangeHandle = () => {
    return new Promise((resolve) => {
      if (!validateAddrFields()) return;

      const fullAddress = constructFullAddr();
      resolve(fullAddress);
    });
  };

  const closeModalHandle = () => {
    resetModal(setIsOpened, setError, setErrorMessage, setPostcode);
    resetInputValue();
  };

  return (
    <>
      {isOpened && (
        <PortalModal
          setIsOpened={setIsOpened}
          setError={setError}
          setErrorMessage={setErrorMessage}
          setPostcode={setPostcode}
        >
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
              <UserOldData
                modalType={modalType}
                tel={tel}
                addr={addr}
                changeInputHandle={changeInputHandle}
              />
            </div>
            <div className="info-modal-new info-modal-data">
              <div>{userInfoModal[modalType].new}</div>
              <UserNewInput
                modalType={modalType}
                changeInputHandle={changeInputHandle}
                addressRef={addressRef}
                detailAddressRef={detailAddressRef}
                postcode={postcode}
                setPostcode={setPostcode}
              />
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
              setPostcode={setPostcode}
              resetInputValue={resetInputValue}
            />

            <ReactSVG
              src={svgCollection.xMark}
              className="info-modal-close"
              onClick={closeModalHandle}
            />
          </div>
        </PortalModal>
      )}
    </>
  );
};

export default UserInfoModal;
