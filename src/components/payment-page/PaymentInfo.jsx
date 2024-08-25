import React, { useState, useEffect } from "react";

// 추가적인 코드들...

const PaymentInfo = ({ paymentInfo, onFormValidChange }) => {
  const [bookRequest, setBookRequest] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleRequestChange = (e) => {
    const requestValue = e.target.value;
    setBookRequest(requestValue);
    setIsValid(requestValue.trim() !== "");
  };

  useEffect(() => {
    onFormValidChange(isValid, bookRequest);
  }, [isValid, bookRequest, onFormValidChange]);

  return (
    <div>
      <div className="payment-info-title">
        <h3>예약자 정보</h3>
        <button className="reset-button">새로 입력하기</button>
      </div>

      <textarea
        value={bookRequest}
        onChange={handleRequestChange}
        placeholder="캠핑장에 전달할 요청사항을 작성해 주세요."
      />
    </div>
  );
};

export default PaymentInfo;

// import React from "react";
// import { useState, useEffect } from "react";
// import "./PaymentPage.css";
// import { paymentInfoForm } from "../../constants/paymentInfoForm";

// const PaymentInfo = ({ paymentInfo, onFormValidChange }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phoneNumber: "",
//     request: "",
//   });

//   useEffect(() => {
//     const isFormValid = formData.name !== "" && formData.phoneNumber !== "";
//     onFormValidChange(isFormValid);
//   }, [formData, onFormValidChange]);

//   const resetFormHandle = () => {
//     setFormData({
//       name: "",
//       phoneNumber: "",
//       request: "",
//     });
//   };

//   const inputChangeHandle = (e, field) => {
//     setFormData({
//       ...formData,
//       [field]: e.target.value,
//     });
//   };

//   return (
//     <div>
//       <div className="payment-info-title">
//         <h3>예약자 정보</h3>
//         <button className="reset-button" onClick={resetFormHandle}>
//           새로 입력하기
//         </button>
//       </div>

//       <div className="payment-info-detail underline">
//         {paymentInfoForm.map((field) => (
//           <div key={field.id} className={`payment-info-detail-${field.id}`}>
//             <p>{field.label}</p>
//             <input
//               type={field.type}
//               value={formData[field.id]}
//               className={`input-${field.id}`}
//               placeholder={field.placeholder}
//               onChange={(e) => inputChangeHandle(e, field.id)}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PaymentInfo;
