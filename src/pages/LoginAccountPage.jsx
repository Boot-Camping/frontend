import React, { useEffect, useState } from "react";
import "../components/login-account-page/LoginAccountPage.css";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../utils/Api";

const LoginAccountPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandle = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);

    try {
      const response = await post("user/login", jsonData);
      const accessToken = response.tokenRequest.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="login-account-wrap">
      <div className="login-account-title">
        <div>아이디로 로그인 하기</div>
      </div>

      <form id="login-account-form" onSubmit={submitHandle}>
        <div className="login-input-wrap">
          <label htmlFor="login-id">아이디</label>
          <input
            type="text"
            id="login-id"
            className="login-input"
            name="loginId"
            placeholder="아이디를 입력해주세요"
            required
          />
        </div>
        <div className="login-input-wrap">
          <label htmlFor="login-pw">비밀번호</label>
          <input
            type="password"
            id="login-pw"
            className="login-input"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            required
          />
        </div>
        <button className="login-submit-btn">로그인</button>
      </form>

      <Link to={"/login"}>
        <button className="move-howtologin">다른 방법으로 로그인</button>
      </Link>
    </section>
  );
};

export default LoginAccountPage;
