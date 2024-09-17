import React from "react";
import "../components/login-page/LoginPage.css";
import { loginTitles } from "../constants/login";
import LoginButtons from "../components/login-page/LoginButtons";
import logoImg from "../assets/image/logo0.png";

const LoginPage = () => {
  return (
    <section className="login-section">
      <>
        <ul className="login-title-wrap">
          {loginTitles.map((loginTitle) => (
            <li
              key={loginTitle.key}
              className={loginTitle.key}
            >
              {loginTitle.text}
            </li>
          ))}
        </ul>
        <div className="login-btns-wrap">
          <div className="login-img">
            <img src={logoImg} alt="camping" />
          </div>

          <LoginButtons />
        </div>
      </>
    </section>
  );
};

export default LoginPage;
