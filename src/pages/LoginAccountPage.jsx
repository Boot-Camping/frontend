import React, { useState } from "react";
import "../components/login-account-page/LoginAccountPage.css";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../utils/api";
import PasswordInput from "../components/common/PasswordInput";
import EmptyContent from "../components/common/EmptyContent";

const LoginAccountPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const submitHandle = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);

    try {
      const response = await post("user/login", jsonData);

      const accessToken =
        response.headers["authorization"] || response.headers["Authorization"];

      localStorage.setItem("accessToken", accessToken);

      if (data.loginId === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
      setError(true);
    }
  };

  return (
    <section className="login-account-wrap">
      <div className="login-account-title">
        <div>아이디로 로그인 하기</div>
      </div>

      <div className="login-account-form-wrap">
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
            <label>비밀번호</label>
            <PasswordInput inputClass="login-input" />
          </div>

          {errorMessage && (
            <EmptyContent errorMessage={errorMessage} error={error} />
          )}

          <button className="login-submit-btn">로그인</button>
        </form>

        <Link to={"/login"}>
          <button className="move-howtologin">다른 방법으로 로그인</button>
        </Link>
      </div>
    </section>
  );
};

export default LoginAccountPage;
