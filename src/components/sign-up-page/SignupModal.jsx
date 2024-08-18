import React from "react";
import { createPortal } from "react-dom";
import { signUpError } from "../../constants/signUp";
import { closeModal } from "../../utils/closeModal";

const SignupModal = ({ error, errorType, isOpened, setIsOpened }) => {
  const errorMessage = () => {
    return signUpError[errorType] || null;
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
            <div className="signup-modal signup-error">
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
            </div>,
            document.getElementById("modal-root")
          )}
        </>
      )}
    </>
  );
};

export default SignupModal;
