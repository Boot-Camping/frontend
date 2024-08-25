import React, { useState } from "react";
import "../components/payment-page/PaymentPage.css";
import PaymentInfo from "../components/payment-page/PaymentInfo";
import PaymentAmount from "../components/payment-page/PaymentAmount";
import PaymentPolicy from "../components/payment-page/PaymentPolicy";
import PaymentModal from "../components/payment-page/PaymentModal";
import { Link } from "react-router-dom";
import useCampInfo from "../hooks/useCampInfo";
import { post } from "../utils/Api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { useCampingDays } from "../hooks/CampingDaysContext";

const PaymentPage = () => {
  const campId = 21;
  const {
    campInfo: paymentInfo,
    loading,
    error,
  } = useCampInfo(campId, "campInfo");
  const { checkIn, checkOut } = useCampingDays();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { userId, accessToken } = getUserIdFromToken();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>캠핑장 정보를 불러오는 중 오류가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <>
      <div className="payment-page underline">
        <h2 className="payment-title">캠핑장 결제하기</h2>
        <PaymentInfo
          paymentInfo={paymentInfo}
          onFormValidChange={setIsFormValid}
        />
        <PaymentAmount
          paymentInfo={paymentInfo}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      </div>
    </>
  );
};

export default PaymentPage;
