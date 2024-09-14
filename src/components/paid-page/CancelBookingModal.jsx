import React from "react";
import "./CancelBookingModal.css";
import PortalModal from "../common/PortalModal";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import useCancelBooking from "../../hooks/useCancelBooking";
import { resetModal } from "../../utils/resetModal";

const CancelBookingModal = ({
  isOpened,
  setIsOpened,
  setErrorMessage,
  bookId,
  onUpdate,
}) => {
  const { putCancelBooking } = useCancelBooking(
    setIsOpened,
    setErrorMessage,
    onUpdate
  );

  const submitHandle = async (event) => {
    event.preventDefault();

    await putCancelBooking(bookId);
  };

  const closeModalHandle = () => {
    resetModal(setIsOpened, setErrorMessage);
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
              onClick={closeModalHandle}
            />
          </div>
        </PortalModal>
      )}
    </>
  );
};

export default CancelBookingModal;
