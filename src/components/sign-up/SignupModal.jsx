import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const SignupModal = ({ error, isOpened, setIsOpened }) => {
  const closeHandle = () => {
    setIsOpened(false);
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
                {error && (
                  <ul>
                    <li>우편번호와 주소는</li>
                    <li>필수 입력 사항입니다.</li>
                  </ul>
                )}
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
