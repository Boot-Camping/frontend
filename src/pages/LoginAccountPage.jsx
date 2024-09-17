import React from "react";
import "../components/login-account-page/LoginAccountPage.css";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/common/PasswordInput";
import EmptyContent from "../components/common/EmptyContent";
import useLogin from "../hooks/useLogin";

const LoginAccountPage = () => {
  const navigate = useNavigate();
  const { postLogin, errorMessage, error } = useLogin();

  const submitHandle = async (event) => {
    event.preventDefault();

    const jsonData = prepareFormData(event.target);
    const result = await postLogin(jsonData);

    if (result) {
      const data = JSON.parse(jsonData);
      navigateToHomeOrAdmin(data);
    }
  };

  const prepareFormData = (target) => {
    const formData = new FormData(target);
    const data = Object.fromEntries(formData);
    return JSON.stringify(data);
  };

  const navigateToHomeOrAdmin = (data) => {
    navigate(data.loginId === "admin" ? "/admin" : "/");
    window.location.reload();
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
          <button className="move-howtologin">이전 페이지</button>
        </Link>
      </div>
    </section>
  );
};

export default LoginAccountPage;
