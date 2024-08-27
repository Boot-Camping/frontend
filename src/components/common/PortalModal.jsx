import React from "react";
import { createPortal } from "react-dom";
import { closeModal } from "../../utils/closeModal";

const PortalModal = ({ setIsOpened, children }) => {
  return (
    <>
      {createPortal(
        <div className="overlay" onClick={closeModal(setIsOpened)}></div>,
        document.getElementById("overlay-root")
      )}
      {createPortal(<>{children}</>, document.getElementById("modal-root"))}
    </>
  );
};

export default PortalModal;
