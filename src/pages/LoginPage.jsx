import React from "react";
import "../components/login-page/LoginPage.css";
import { loginTitles } from "../constants/login";
import LoginButtons from "../components/login-page/LoginButtons";

const LoginPage = () => {
  return (
    <section className="login-section">
      <>
        <ul className="login-title-wrap">
          {loginTitles.map((loginTitle, index) => (
            <li
              key={`login-title${index + 1}`}
              className={`login-title${index + 1}`}
            >
              {loginTitle}
            </li>
          ))}
        </ul>
        <div className="login-btns-wrap">
          <div className="login-img">
            <img src="/src/assets/image/camping.png" />
          </div>

          <LoginButtons />
        </div>
      </>
    </section>
  );
};

export default LoginPage;
