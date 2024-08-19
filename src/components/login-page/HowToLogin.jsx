import React from "react";
import "./HowToLogin.css";
import { loginTitles } from "../../constants/login";
import LoginButtons from "../login-page/LoginButtons";

const HowToLogin = ({ setclickLoginAccount }) => {
  return (
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
      <div className="login-img">
        <img src="../src/assets/image/camping.png" />
      </div>

      <LoginButtons setclickLoginAccount={setclickLoginAccount} />
    </>
  );
};

export default HowToLogin;
