import React from "react";
import "./DeleteAccountModal.css";
import { closeModal } from "../../utils/closeModal";
import { useNavigate } from "react-router-dom";
import PortalModal from "../common/PortalModal";

const DeleteAccountModal = ({ error, isOpened, setIsOpened }) => {
  const navigate = useNavigate();

  const getModalMessage = () => {
    return error ? "동의사항에 체크해주세요" : "그동안 이용해주셔서 감사합니다";
  };

  const closeModalHandle = () => {
    closeModal(setIsOpened)();

    if (!error) {
			navigateToHome();
    }
  };

  const navigateToHome = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {isOpened && (
        <PortalModal setIsOpened={setIsOpened}>
          <div className="delete-account-modal modal delete-account-error">
            <div className="delete-account-modal-content">
              {getModalMessage()}
            </div>
            <button
              type="button"
              className="delete-account-modal-btn"
              onClick={closeModalHandle}
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
