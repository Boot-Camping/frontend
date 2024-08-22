import React, { useState } from "react";
import "../components/payment-page/PaymentPage.css";

import PaymentInfo from "../components/payment-page/PaymentInfo";
import PaymentAmount from "../components/payment-page/PaymentAmount";
import PaymentPolicy from "../components/payment-page/PaymentPolicy";
import PaymentModal from "../components/payment-page/PaymentModal";
import { Link } from "react-router-dom";

const PaymentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const openModal = () => {
    console.log("openModal 함수가 호출됨");
    if (isButtonEnabled && isFormValid) {
      setIsModalOpen(true);
      console.log("모달 열림");
    } else if (!isFormValid) {
      console.log("경고 알림 실행됨");
      alert("필수 정보를 모두 입력해주세요.");
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
        <PaymentInfo onFormValidChange={formValidChangeHandle} />
        <PaymentAmount />
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
          <button className="payment-modal-button" onClick={closeModal}>
            취소
          </button>
          <button className="payment-modal-button" onClick={openSecondModal}>
            결제하기
          </button>
        </PaymentModal>

        <PaymentModal
          isModalOpen={isSecondModalOpen}
          closeModal={closeSecondModal}
        >
          <p className="payment-modal-title">결제가 완료되었습니다!</p>
          <Link to="/" className="payment-modal-button">
            홈으로 이동
          </Link>
          <Link to="/mypage" className="payment-modal-button">
            예약내역 보러가기
          </Link>
        </PaymentModal>
      </div>
    </>
  );
};

export default PaymentPage;
