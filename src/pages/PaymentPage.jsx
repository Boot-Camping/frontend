import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/payment-page/PaymentPage.css";

import { useCampingDays } from "../context/campingDaysContext";
import { post, get } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

import PaymentInfo from "../components/payment-page/PaymentInfo";
import PaymentAmount from "../components/payment-page/PaymentAmount";
import PaymentPolicy from "../components/payment-page/PaymentPolicy";
import NormalModal from "../components/common/NormalModal";
import PaymentFailAlert from "../components/payment-page/PaymentFailAlert";
import EmptyContent from "../components/common/EmptyContent";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({ name: "", tel: "", email: "" });

  const { userId, accessToken } = getUserIdFromToken();

  if (!campInfo) {
    return <div>캠핑장 정보가 없습니다.</div>;
  }

  const submitRequestHandle = (request) => setBookRequest(request);

  const paymentDataHandle = (totalPrice, totalBookNum) => {
    setTotalPrice(totalPrice);
    setTotalBookNum(totalBookNum);
  };

  const toggleModal = (modalType, isOpen) => {
    if (modalType === "first") {
      setIsModalOpen(isOpen);
    } else if (modalType === "second") {
      setIsSecondModalOpen(isOpen);
    }
  };

  const paymentHandle = async () => {
    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    const data = {
      totalPrice,
      checkIn: new Date(checkIn).toISOString(),
      checkOut: new Date(checkOut).toISOString(),
      bookRequest,
      bookNum: totalBookNum,
    };

    try {
      const response = await post(
        `camps/bookings/${campId}`,
        data,
        customHeaders
      );
      console.log("예약 성공! 😄:", response);
      toggleModal("second", true);
    } catch (error) {
      setErrorMessage(error.message);
      setError(true);
    }
  };

  const userDataFetchHandle = async () => {
    setLoading(true);
    const customHeaders = { Authorization: `${accessToken}` };

    try {
      const response = await get(`userprofile/${userId}`, customHeaders);
      const userData = response[0];

      setUserData({
        name: userData.name || "",
        tel: userData.tel || "",
        email: userData.email || "",
      });
    } catch (error) {
      setErrorMessage("유저 정보를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userDataFetchHandle();
  }, [accessToken, userId]);

  return (
    <div className="payment-page">
      <h2 className="payment-title">캠핑장 결제하기</h2>
      <PaymentInfo
        submitRequestHandle={submitRequestHandle}
        userData={userData}
      />
      <PaymentAmount
        campInfo={campInfo}
        checkIn={checkIn}
        checkOut={checkOut}
        paymentDataHandle={paymentDataHandle}
      />
      <PaymentPolicy allCheckedHandle={setIsButtonEnabled} />

      <button
        className="payment-button"
        onClick={() => toggleModal("first", true)}
        disabled={!isButtonEnabled}
      >
        캠핑장 결제하기
      </button>

      <NormalModal
        isModalOpen={isModalOpen}
        closeModal={() => toggleModal("first", false)}
      >
        <p className="payment-modal-title">결제를 진행하시겠습니까?</p>
        <div className="modal-box">
          <button
            className="payment-modal-button"
            onClick={() => toggleModal("first", false)}
          >
            취소
          </button>
          <button className="payment-modal-button" onClick={paymentHandle}>
            결제하기
          </button>
        </div>
        {error && <EmptyContent errorMessage={errorMessage} error={error} />}
      </NormalModal>

      <NormalModal
        isModalOpen={isSecondModalOpen}
        closeModal={() => toggleModal("second", false)}
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
      </NormalModal>

      <PaymentFailAlert
        message={alertMessage}
        onClose={() => setAlertMessage("")}
      />
    </div>
  );
};

export default PaymentPage;
