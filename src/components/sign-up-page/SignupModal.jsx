import React from "react";
import "./SignupModal.css";
import { signUpError } from "../../constants/signUp";
import { closeModal } from "../../utils/closeModal";
import PortalModal from "../common/PortalModal";
import { useNavigate } from "react-router-dom";

const SignupModal = ({ error, errorType, isOpened, setIsOpened }) => {
  const navigate = useNavigate();

  const getErrorMessage = () => {
    return signUpError[errorType] || null;
  };

  const closeModalHandle = () => {
    closeModal(setIsOpened)();

    if (!error) {
      navigateToAccountPage();
    }
  };

  const navigateToAccountPage = () => {
    navigate("/login/account");
  };

  return (
    <>
      {isOpened && (
        <PortalModal setIsOpened={setIsOpened}>
          <div className="signup-modal modal signup-error">
            <div className="signup-modal-content">
              {error ? getErrorMessage() : "회원가입이 완료되었습니다"}
            </div>
            <button
              type="button"
              className="signup-modal-btn"
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

export default SignupModal;
