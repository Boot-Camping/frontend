import React, { useEffect, useState } from "react";
import "./SaveModal.css";
import { createPortal } from "react-dom";
import { closeModal } from "../../utils/closeModal";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { deleteRequest } from "../../utils/Api";

const SaveModal = ({ isOpened, setIsOpened, selectedData, onUpdate }) => {
  const { accessToken } = getUserIdFromToken();
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandle = async (event) => {
    event.preventDefault();

    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    const wishId = selectedData.wishId[0];
    console.log("wishId", wishId);

    try {
      await deleteRequest(
        `userprofile/wishlist/remove/${wishId}`,
        {},
        customHeaders
      );
      closeModal(setIsOpened)();
      setIsOpened(false);
      onUpdate();
    } catch (error) {
      setErrorMessage(error.message);
      console.log(errorMessage);
    }
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
            <div className="save-modal modal">
              <div className="save-modal-txt">
                찜 목록에서 삭제하시겠습니까?
              </div>
              <div className="save-btn-wrap">
                <button
                  className="save-cancel-btn"
                  onClick={closeModal(setIsOpened)}
                >
                  취소
                </button>
                <button className="save-confirm-btn" onClick={submitHandle}>
                  확인
                </button>
              </div>
            </div>,
            document.getElementById("modal-root")
          )}
        </>
      )}
    </>
  );
};

export default SaveModal;
