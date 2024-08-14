import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { SIGN_UP_ERROR } from "../../constants/SignUp";

const SignupModal = ({ error, errorType, isOpened, setIsOpened }) => {
  const closeHandle = () => {
    setIsOpened(false);
  };

  const errorMessage = () => {
    return SIGN_UP_ERROR[errorType] || null;
  };

  return (
    <>
      {isOpened && (
        <>
          {createPortal(
            <div className="overlay" onClick={closeHandle}></div>,
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

export default SignupModal;
