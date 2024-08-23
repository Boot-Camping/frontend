import React, { useState, useEffect } from "react";
import "../components/payment-page/PaymentPage.css";
import PaymentInfo from "../components/payment-page/PaymentInfo";
import PaymentAmount from "../components/payment-page/PaymentAmount";
import PaymentPolicy from "../components/payment-page/PaymentPolicy";
import PaymentModal from "../components/payment-page/PaymentModal";
import { Link } from "react-router-dom";
import { get } from "../utils/Api";

const PaymentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await get("camp/21");
        setPaymentInfo(response);
      } catch (error) {
        console.error("캠핑장 정보 가져오기 실패:", error);
      }
    };
    fetchPaymentInfo();
  }, []);

  if (!paymentInfo) {
    return <div>Loading...</div>;
  }

  const openModal = () => {
    if (isButtonEnabled && isFormValid) {
      setIsModalOpen(true);
    } else if (!isFormValid) {
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
        <PaymentInfo
          paymentInfo={paymentInfo}
          onFormValidChange={formValidChangeHandle}
        />
        <PaymentAmount paymentInfo={paymentInfo} />
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
