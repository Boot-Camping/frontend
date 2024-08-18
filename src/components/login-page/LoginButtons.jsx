import React from "react";
import { loginTypes } from "../../constants/login";
import { Link } from "react-router-dom";

const LoginButtons = ({ setclickLoginAccount }) => {
  const loginAccountHandle = () => {
    setclickLoginAccount(true);
    console.log("true");
  };

  return (
    <div className="login-btns">
      {loginTypes.map((loginType) => {
        const button = (
          <button key={loginType.key} className={`login-btn ${loginType.key}`}>
            {loginType.text}
          </button>
        );

        if (loginType.key === "login-account") {
          return (
            <button
              key={loginType.key}
              className={`login-btn ${loginType.key}`}
              onClick={loginAccountHandle}
            >
              {loginType.text}
            </button>
          );
        } else if (loginType.key === "signup") {
          return (
            <Link to={"/signup"} key={loginType.key}>
              {button}
            </Link>
          );
        }

        return button;
      })}
    </div>
  );
};

export default LoginButtons;
