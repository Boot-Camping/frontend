import React from "react";
import "./SignupModal.css";
import { createPortal } from "react-dom";
import { signUpError } from "../../constants/signUp";
import { closeModal } from "../../utils/closeModal";
import PortalModal from "../common/PortalModal";

const SignupModal = ({ error, errorType, isOpened, setIsOpened }) => {
  const errorMessage = () => {
    return signUpError[errorType] || null;
  };

  return (
    <>
      {isOpened && (
        <PortalModal setIsOpened={setIsOpened}>
          <div className="signup-modal modal signup-error">
            <div className="signup-modal-content">
              {error && errorMessage()}
            </div>
            <button
              type="button"
              className="signup-modal-btn"
              onClick={closeModal(setIsOpened)}
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
