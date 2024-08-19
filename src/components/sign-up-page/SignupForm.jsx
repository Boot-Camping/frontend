import React, { useEffect, useRef, useState } from "react";
import "./SignupForm.css";
import { signUp, signUpTerms } from "../../constants/signUp";
import DaumPostCode from "./DaumPostCode";
import SignupTerms from "../../components/sign-up-page/SignupTerms";
import useAddress from "../../hooks/useAddress";

const SignupForm = ({ setError, setErrorType, setIsOpened, handleSubmit }) => {
  const { postcode, setPostcode } = useAddress();
  const [checkedTerms, setCheckedTerms] = useState(
    Array(signUpTerms.length).fill(false)
  );
  const checkboxRefs = useRef([]);
  const addressRef = useRef(null);
  const detailAddressRef = useRef(null);

  const submitHandle = (event) => {
    event.preventDefault();

    if (postcode === "") {
      setError(true);
      setErrorType("post");
      setIsOpened(true);
      return;
    }

    if (!checkedTerms.every(Boolean)) {
      setError(true);
      setErrorType("terms");
      setIsOpened(true);
      checkboxRefs.current.forEach((ref, index) => {
        if (ref && !checkedTerms[index]) {
          ref.focus();
          return;
        }
      });
      return;
    }

    setError(false); // 에러가 없으면 메시지 초기화
    setIsOpened(false);

    // 입력된 데이터를 formData에 저장
    const formData = {};
    signUp.forEach((signup) => {
      const inputElement = document.querySelector(
        `input[name="${signup.key}"]`
      );
      if (inputElement) {
        formData[signup.key] = inputElement.value;
      }
    });
    formData.addr = `(${postcode}) ${addressRef.current.value} ${detailAddressRef.current.value}`; // 주소는 별도로 처리

    // handleSubmit 호출
    handleSubmit(formData);

    console.log("제출 완료", formData);
  };

  return (
    <>
      <form id="signup-form" onSubmit={submitHandle}>
        {signUp.map((signup) => (
          <div className="signup-input-wrap" key={signup.key}>
            <label className="signup-input-label">{signup.label}</label>
            {signup.label === "주소" ? (
              <DaumPostCode
                postcode={postcode}
                setPostcode={setPostcode}
                addressRef={addressRef}
                detailAddressRef={detailAddressRef}
              />
            ) : (
              <input
                className="signup-input"
                type={signup.type}
                placeholder={signup.placeholder}
                name={signup.key}
                required
              />
            )}
          </div>
        ))}

        <SignupTerms
          checkedTerms={checkedTerms}
          setCheckedTerms={setCheckedTerms}
          setErrorFocus={(ref) => {
            if (ref && !checkboxRefs.current.includes(ref)) {
              checkboxRefs.current.push(ref);
            }
          }}
        />

        <button className="signup-btn">가입하기</button>
      </form>
    </>
  );
};

export default SignupForm;
