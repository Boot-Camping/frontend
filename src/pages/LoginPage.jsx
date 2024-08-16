import React, { useState } from "react";
import "../components/login-page/LoginPage.css";
import HowToLogin from "../components/login-page/HowToLogin";
import LoginAccount from "../components/login-page/LoginAccount";

const LoginPage = () => {
  const [clickLoginAccount, setclickLoginAccount] = useState(false);

  return (
    <section className="login-section">
      {clickLoginAccount ? (
        <LoginAccount />
      ) : (
        <HowToLogin setclickLoginAccount={setclickLoginAccount} />
      )}
    </section>
  );
};

export default LoginPage;
