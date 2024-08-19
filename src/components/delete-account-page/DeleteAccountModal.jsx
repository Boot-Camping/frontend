import React from "react";
import "./DeleteAccountModal.css";
import { createPortal } from "react-dom";
import { closeModal } from "../../utils/closeModal";
import { useNavigate } from "react-router-dom";

const DeleteAccountModal = ({ error, isOpened, setIsOpened }) => {
  const navigate = useNavigate();

  const message = () => {
    if (error) {
      return "동의사항에 체크해주세요";
    } else {
      return "그동안 이용해주셔서 감사합니다";
    }
  };

  const closeHandle = () => {
    closeModal(setIsOpened)();

    if (!error) {
      navigate("/");
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
            <div className="delete-account-modal modal delete-account-error">
              <div className="delete-account-modal-content">{message()}</div>
              <button
                type="button"
                className="delete-account-modal-btn"
                onClick={closeHandle}
              >
                확인
              </button>
            </div>,
            document.getElementById("modal-root")
          )}
        </>
      )}
    </>
  );
};

export default DeleteAccountModal;
