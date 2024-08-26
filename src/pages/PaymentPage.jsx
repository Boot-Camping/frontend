import React, { useState } from "react";
import "../components/payment-page/PaymentPage.css";
import PaymentInfo from "../components/payment-page/PaymentInfo";
import PaymentAmount from "../components/payment-page/PaymentAmount";
import PaymentPolicy from "../components/payment-page/PaymentPolicy";
import PaymentModal from "../components/payment-page/PaymentModal";
import PaymentFailAlert from "../components/payment-page/PaymentFailAlert";
import { Link } from "react-router-dom";
import { useCampingDays } from "../hooks/CampingDaysContext";
import { post } from "../utils/Api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const PaymentPage = ({ campInfo }) => {
  const campId = campInfo.id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { checkIn, checkOut } = useCampingDays();
  const [bookRequest, setBookRequest] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalBookNum, setTotalBookNum] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

  const { userId, accessToken } = getUserIdFromToken();

  if (!campInfo) {
    return <div>캠핑장 정보가 없습니다.</div>;
  }

  const submitRequestHandle = (request) => {
    setBookRequest(request);
  };

  const paymentDataHandle = (totalPrice, totalBookNum) => {
    setTotalPrice(totalPrice);
    setTotalBookNum(totalBookNum);
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

  const closeAlert = () => {
    setAlertMessage("");
  };

  const allCheckedHandle = (allChecked) => {
    setIsButtonEnabled(allChecked);
  };

  const paymentHandle = async () => {
    const data = {
      totalPrice: totalPrice,
      checkIn: new Date(checkIn).toISOString(),
      checkOut: new Date(checkOut).toISOString(),
      bookRequest: bookRequest,
      bookNum: totalBookNum,
    };
    console.log("전송하려는 예약정보:", data);

    try {
      const response = await post(`book/${campId}/${userId}`, data, {
        Authorization: `Bearer ${accessToken}`,
      });
      console.log("예약 성공! 😄:", response);
      openSecondModal();
    } catch (error) {
      console.error("예약실패 🥲");
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "결제 중 문제가 발생했습니다.";
      setAlertMessage(errorMessage);
    }
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
          paymentDataHandle={paymentDataHandle}
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
            <button className="payment-modal-button" onClick={paymentHandle}>
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

        <PaymentFailAlert message={alertMessage} onClose={closeAlert} />
      </div>
    </>
  );
};

export default PaymentPage;
