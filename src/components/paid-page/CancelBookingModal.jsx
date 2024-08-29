import React from "react";
import "./CancelBookingModal.css";
import PortalModal from "../common/PortalModal";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import { closeModal } from "../../utils/closeModal";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { put } from "../../utils/api";

const CancelBookingModal = ({
  isOpened,
  setIsOpened,
  errorMessage,
  setErrorMessage,
  bookId,
	onUpdate,
}) => {
  const { accessToken } = getUserIdFromToken();

  const submitHandle = async (event) => {
    event.preventDefault();

    const customHeaders = {
      Authorization: accessToken,
    };

    try {
      await put(`camps/bookings/${bookId}`, {}, customHeaders);
			setIsOpened(false);
			setErrorMessage("");
			onUpdate();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {isOpened && (
        <PortalModal setIsOpened={setIsOpened}>
          <div className="cancel-booking-modal modal">
            <div className="cancel-booking-txt">예약을 취소하시겠습니까?</div>
            <button className="cancel-booking-btn" onClick={submitHandle}>
              확인
            </button>
            <ReactSVG
              src={svgCollection.xMark}
              className="cancel-booking-close"
              onClick={closeModal(setIsOpened)}
            />
          </div>
        </PortalModal>
      )}
    </>
  );
};

export default CancelBookingModal;
