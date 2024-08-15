import React, { useEffect, useRef, useState } from "react";
import { signUp, signUpTerms } from "../../constants/signUp";
import DaumPostCode from "./DaumPostCode";
import SignupTerms from "../../components/sign-up/SignupTerms";
import useAddress from "../../hooks/useAddress";

const SignupForm = ({ setError, setErrorType, setIsOpened }) => {
  const { postcode, setPostcode } = useAddress();
  const [checkedTerms, setCheckedTerms] = useState(
    Array(signUpTerms.length).fill(false)
  );
  const checkboxRefs = useRef([]);

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
    console.log("제출 완료");
  };

  return (
    <>
      <form id="signup-form" onSubmit={submitHandle}>
        {signUp.map((signup) => (
          <div className="signup-input-wrap" key={signup.key}>
            <label className="signup-input-label">{signup.label}</label>
            {signup.label === "주소" ? (
              <DaumPostCode postcode={postcode} setPostcode={setPostcode} />
            ) : (
              <input
                className="signup-input"
                type={signup.type}
                placeholder={signup.placeholder}
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
