import React, { useState, useEffect } from "react";

const PaymentInfo = ({ submitRequestHandle, userData, loading }) => {
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
      {loading ? (
        <div>로딩중</div>
      ) : (
        <>
          <div>{userData.name}</div>
          <div>{userData.tel}</div>
          <div>{userData.email}</div>
        </>
      )}
      <textarea
        value={bookRequest}
        className="request-form"
        onChange={requestChangeHandle}
        placeholder="캠핑장에 전달할 요청사항을 작성해 주세요."
        disabled={loading}
      />
    </div>
  );
};

export default PaymentInfo;
