import React from "react";
import { createPortal } from "react-dom";
import { resetModal } from "../../utils/resetModal";

const PortalModal = ({
  setIsOpened,
  setError,
  setErrorMessage,
  setPostcode,
  children,
}) => {
  const resetModalHandle = () => {
    resetModal(setIsOpened, setError, setErrorMessage, setPostcode);
  };

  return (
    <>
      {createPortal(
        <div className="overlay" onClick={resetModalHandle}></div>,
        document.getElementById("overlay-root")
      )}
      {createPortal(<>{children}</>, document.getElementById("modal-root"))}
    </>
  );
};

export default PortalModal;
