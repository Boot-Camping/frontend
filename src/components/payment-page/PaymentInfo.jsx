import React, { useState, useEffect } from "react";
import "./PaymentPage.css";

const PaymentInfo = ({ submitRequestHandle, userData, loading }) => {
  const [bookRequest, setBookRequest] = useState("");

  const requestChangeHandle = (e) => {
    setBookRequest(e.target.value);
  };

  useEffect(() => {
    submitRequestHandle(bookRequest);
  }, [bookRequest, submitRequestHandle]);

  return (
    <div className="payment-info-wrapper">
      <div className="payment-request">예약자 정보</div>
      {loading ? (
        <div>로딩중</div>
      ) : userData ? (
        <div className="booker-info">
          <div>• 예약자명: {userData.name || "이름 정보 없음"}</div>
          <div>• 연락처: {userData.tel || "전화번호 정보 없음"}</div>
          <div>• 이메일: {userData.email || "이메일 정보 없음"}</div>
        </div>
      ) : (
        <div>사용자 정보가 없습니다</div>
      )}
      <input
        value={bookRequest}
        type="text"
        className="request-form"
        onChange={requestChangeHandle}
        placeholder="캠핑장에 전달할 요청사항을 작성해 주세요."
        disabled={loading}
      />
    </div>
  );
};

export default PaymentInfo;
