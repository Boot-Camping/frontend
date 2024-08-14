import React from "react";
import { SIGN_UP } from "../../constants/SignUp";
import PostCodeApi from "../../components/sign-up/PostCodeApi";
import SignupTerms from "../../components/sign-up/SignupTerms";
import useAddress from "../../hooks/useAddress";

const SignupForm = ({ setError, setIsOpened }) => {
  const { postcode, setPostcode } = useAddress();

  const submitHandle = (event) => {
    event.preventDefault();

    if (postcode === "") {
      setError(true);
      setIsOpened(true);
      return;
    }

    setError(false); // 에러가 없으면 메시지 초기화
    setIsOpened(false);
    console.log("제출 완료");
  };

  return (
    <>
      <form id="signup-form" onSubmit={submitHandle}>
        {SIGN_UP.map((signup) => (
          <div className="signup-input-wrap" key={signup.key}>
            <label className="signup-input-label">{signup.label}</label>
            {signup.label === "주소" ? (
              <PostCodeApi setPostcode={setPostcode} />
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

        <SignupTerms />

        <button className="signup-btn">가입하기</button>
      </form>
    </>
  );
};

export default SignupForm;
