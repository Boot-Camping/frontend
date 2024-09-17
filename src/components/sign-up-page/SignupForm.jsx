import React, { useRef, useState } from "react";
import "./SignupForm.css";
import { signUp, signUpTerms } from "../../constants/signUp";
import DaumPostCode from "../common/DaumPostCode";
import SignupTerms from "../../components/sign-up-page/SignupTerms";
import useAddress from "../../hooks/useAddress";
import { phoneNumber } from "../../utils/phoneNumber";
import { validation } from "../../utils/validation";
import PasswordInput from "../common/PasswordInput";
import EmptyContent from "../common/EmptyContent";
import useSignup from "../../hooks/useSignup";

const SignupForm = ({ error, setError, setErrorType, setIsOpened }) => {
  const { postcode, setPostcode } = useAddress();
  const [checkedTerms, setCheckedTerms] = useState(
    Array(signUpTerms.length).fill(false)
  );
  const checkboxRefs = useRef([]);
  const addressRef = useRef(null);
  const detailAddressRef = useRef(null);
  const { postSignup, errorMessage } = useSignup(setError);

  const collectFormData = () => {
    const formData = {};
    signUp.forEach((signup) => {
      const inputElement = document.querySelector(
        `input[name="${signup.key}"]`
      );
      if (inputElement) {
        formData[signup.key] = inputElement.value;
      }
    });
    formData.addr = `(${postcode}) ${addressRef.current.value} ${detailAddressRef.current.value}`;

    return formData;
  };

  const validationHandle = (formData) => {
    return validation({
      password: formData.password,
      passwordChk: formData.passwordChk,
      email: formData.email,
      postcode,
      checkedTerms,
      checkboxRefs,
      setError,
      setErrorType,
      setIsOpened,
    });
  };

  const submitHandle = async (event) => {
    event.preventDefault();

    const formData = collectFormData();

    if (!validationHandle(formData)) {
      return;
    }

    setError(false);
    delete formData.passwordChk;

		const isSuccess = await postSignup(formData);
		if(isSuccess) {
			setIsOpened(true);
		}
  };

  return (
    <>
      <form id="signup-form" onSubmit={submitHandle}>
        {signUp.map((signup) => (
          <div className="signup-input-wrap" key={signup.key}>
            <label
              className={`signup-input-label ${
                signup.label === "주소" ? "signup-address" : ""
              }`}
            >
              {signup.label}
            </label>
            {signup.label === "주소" ? (
              <DaumPostCode
                postcode={postcode}
                setPostcode={setPostcode}
                addressRef={addressRef}
                detailAddressRef={detailAddressRef}
              />
            ) : signup.label === "비밀번호" ? (
              <PasswordInput inputClass="signup-input" />
            ) : signup.label === "비밀번호 확인" ? (
              <PasswordInput inputClass="signup-input" type="pwChk" />
            ) : (
              <input
                className="signup-input"
                type={signup.type}
                placeholder={signup.placeholder}
                name={signup.key}
                required
                autoComplete={signup.autocomplete}
                onInput={
                  signup.label === "전화번호" ? (e) => phoneNumber(e) : null
                }
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

        {errorMessage && (
          <EmptyContent errorMessage={errorMessage} error={error} />
        )}
      </form>
    </>
  );
};

export default SignupForm;
