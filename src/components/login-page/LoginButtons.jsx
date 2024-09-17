import React from "react";
import "./LoginButtons.css";
import { Link } from "react-router-dom";

const LoginButtons = () => {
  return (
    <div className="login-btns">
      <Link to={"/login/account"}>
        <button className="login-btn login-account">로그인</button>
      </Link>
      <Link to={"/signup"}>
        <button className="login-btn signup">회원가입</button>
      </Link>
    </div>
  );
};

export default LoginButtons;
