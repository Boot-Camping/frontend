import React from "react";
import "./DeleteAccountModal.css";
import { closeModal } from "../../utils/closeModal";
import { useNavigate } from "react-router-dom";
import PortalModal from "../common/PortalModal";

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
      window.location.reload();
    }
  };

  return (
    <>
      {isOpened && (
        <PortalModal setIsOpened={setIsOpened}>
          <div className="delete-account-modal modal delete-account-error">
            <div className="delete-account-modal-content">{message()}</div>
            <button
              type="button"
              className="delete-account-modal-btn"
              onClick={closeHandle}
            >
              확인
            </button>
          </div>
        </PortalModal>
      )}
    </>
  );
};

export default DeleteAccountModal;
