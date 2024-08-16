import React from "react";
import "../components/payment-page/PaymentPage.css";
import PaymentInfo from "../components/payment-page/PaymentInfo";
import PaymentAmount from "../components/payment-page/PaymentAmount";
import PaymentPolicy from "../components/payment-page/PaymentPolicy";

const PaymentPage = () => {
  return (
    <>
      <h2 className="payment-title">캠핑장 결제하기</h2>
      <PaymentInfo />
      <PaymentAmount />
      <PaymentPolicy />
    </>
  );
};

export default PaymentPage;
