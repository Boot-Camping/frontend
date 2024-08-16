import React, { useState } from "react";
import "../components/payment-page/PaymentPage.css";
import PaymentInfo from "../components/payment-page/PaymentInfo";
import PaymentAmount from "../components/payment-page/PaymentAmount";
import PaymentPolicy from "../components/payment-page/PaymentPolicy";
import PaymentModal from "../components/detail-page/PaymentModal";
import { Link } from "react-router-dom";

const PaymentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
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

  return (
    <>
      <h2 className="payment-title">캠핑장 결제하기</h2>
      <PaymentInfo />
      <PaymentAmount />
      <PaymentPolicy />
      <button onClick={openModal}>캠핑장 결제하기</button>

      <PaymentModal isModalOpen={isModalOpen} closeModal={closeModal}>
        <p>결제를 진행하시겠습니까?</p>
        <button onClick={closeModal}>취소</button>
        <button onClick={openSecondModal}>결제하기</button>
      </PaymentModal>

      <PaymentModal
        isModalOpen={isSecondModalOpen}
        closeModal={closeSecondModal}
      >
        <p>결제가 완료되었습니다!</p>
        <button onClick={() => (window.location.href = "/")}>
          홈으로 이동
        </button>
        <button onClick={() => (window.location.href = "/mypage")}>
          나의 예약 보러가기
        </button>
      </PaymentModal>
    </>
  );
};

export default PaymentPage;
