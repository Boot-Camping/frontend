import React, { useState, useEffect } from "react";

const PaymentInfo = ({ submitRequestHandle }) => {
  const [bookRequest, setBookRequest] = useState("");

  const requestChangeHandle = (e) => {
    const requestValue = e.target.value;
    setBookRequest(requestValue);
  };

  useEffect(() => {
    submitRequestHandle(bookRequest);
  }, [bookRequest, submitRequestHandle]);

  return (
    <div>
      <div className="payment-info-title">
        <h3>예약자 정보</h3>
      </div>

      <textarea
        value={bookRequest}
        className="request-form"
        onChange={requestChangeHandle}
        placeholder="캠핑장에 전달할 요청사항을 작성해 주세요."
      />
    </div>
  );
};

export default PaymentInfo;
