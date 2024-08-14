import React, { useState } from "react";
import "../css/SignUp.css";
import SignupForm from "../components/sign-up/SignupForm";
import SignupModal from "../components/sign-up/SignupModal";

const SignupPage = () => {
  const [error, setError] = useState(false);
  const [errorType, setErrorType] = useState("");
  const [isOpened, setIsOpened] = useState(false);

  return (
    <section className="signup-section">
      <div className="signup-title">회원가입</div>
      <SignupForm
        setError={setError}
        setIsOpened={setIsOpened}
        setErrorType={setErrorType}
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
