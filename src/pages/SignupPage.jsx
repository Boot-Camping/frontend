import React, { useEffect, useState } from "react";
import "../components/sign-up-page/SignUp.css";
import SignupForm from "../components/sign-up-page/SignupForm";
import SignupModal from "../components/sign-up-page/SignupModal";
import axios from "axios";

const SignupPage = () => {
  const [error, setError] = useState(false);
  const [errorType, setErrorType] = useState("");
  const [isOpened, setIsOpened] = useState(false);

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post('https://171c76df-906f-4132-bf39-844995b3eed9.mock.pstmn.io//api/user/signup', data);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className="signup-section">
      <div className="signup-title">회원가입</div>
      <SignupForm
        setError={setError}
        setIsOpened={setIsOpened}
        setErrorType={setErrorType}
        handleSubmit={handleSubmit}
      />

      <SignupModal
        error={error}
        errorType={errorType}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
      />
    </section>
  );
};

export default SignupPage;
