import React from "react";
import { createPortal } from "react-dom";
import { closeModal } from "../../utils/closeModal";

const PortalModal = ({
  setIsOpened,
  setError,
  setErrorMessage,
  setPostcode,
  children,
}) => {
  const resetModalHandle = () => {
    closeModal(setIsOpened)();
    setError(false);
    setErrorMessage("");
    setPostcode("");
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
