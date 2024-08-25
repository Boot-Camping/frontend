import React, { useState } from "react";
import "../components/payment-page/PaymentPage.css";
import PaymentInfo from "../components/payment-page/PaymentInfo";
import PaymentAmount from "../components/payment-page/PaymentAmount";
import PaymentPolicy from "../components/payment-page/PaymentPolicy";
import PaymentModal from "../components/payment-page/PaymentModal";
import { Link } from "react-router-dom";
import { useCampingDays } from "../hooks/CampingDaysContext";
import { post } from "../utils/Api";

const PaymentPage = ({ campInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { checkIn, checkOut } = useCampingDays();
  const [bookRequest, setBookRequest] = useState("");

  if (!campInfo) {
    return <div>캠핑장 정보가 없습니다.</div>;
  }

  const submitRequestHandle = (request) => {
    setBookRequest(request);
  };

  const openModal = () => {
    if (isButtonEnabled) {
      setIsModalOpen(true);
    } else {
      alert("*필수 정보를 모두 입력해주세요.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSecondModal = () => {
    setIsModalOpen(false);
    setIsSecondModalOpen(true);
  };

  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
  };

  const allCheckedHandle = (allChecked) => {
    setIsButtonEnabled(allChecked);
  };

  const formValidChangeHandle = (isValid) => {
    setIsFormValid(isValid);
  };

  return (
    <>
      <div className="payment-page underline">
        <h2 className="payment-title">캠핑장 결제하기</h2>
        <PaymentInfo submitRequestHandle={submitRequestHandle} />
        <PaymentAmount
          campInfo={campInfo}
          checkIn={checkIn}
          checkOut={checkOut}
        />
        <PaymentPolicy allCheckedHandle={allCheckedHandle} />
        <button
          className="payment-button"
          onClick={openModal}
          disabled={!isButtonEnabled}
        >
          캠핑장 결제하기
        </button>

        <PaymentModal isModalOpen={isModalOpen} closeModal={closeModal}>
          <p className="payment-modal-title">결제를 진행하시겠습니까?</p>
          <div className="modal-box">
            <button className="payment-modal-button" onClick={closeModal}>
              취소
            </button>
            <button className="payment-modal-button" onClick={openSecondModal}>
              결제하기
            </button>
          </div>
        </PaymentModal>

        <PaymentModal
          isModalOpen={isSecondModalOpen}
          closeModal={closeSecondModal}
        >
          <p className="payment-modal-title">결제가 완료되었습니다!</p>
          <div className="modal-box">
            <Link to="/" className="payment-modal-button">
              홈으로 이동
            </Link>
            <Link to="/paid" className="payment-modal-button">
              예약내역 보러가기
            </Link>
          </div>
        </PaymentModal>
      </div>
    </>
  );
};

export default PaymentPage;
