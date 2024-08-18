import React from "react";

const LoginAccount = () => {
  const reloadHandle = () => {
    location.reload();
  };

  return (
    <>
      <div className="login-account-title">
        <div>아이디로 로그인 하기</div>
      </div>

      <form id="login-account-form">
        <div className="login-input-wrap">
          <label htmlFor="login-id">아이디</label>
          <input
            type="text"
            id="login-id"
            name="loginId"
            placeholder="아이디를 입력해주세요"
          />
        </div>
        <div className="login-input-wrap">
          <label htmlFor="login-pw">비밀번호</label>
          <input
            type="text"
            id="login-pw"
            name="password"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <button className="login-submit-btn">로그인</button>
      </form>

      <button className="move-howtologin" onClick={reloadHandle}>
        다른 방법으로 로그인
      </button>
    </>
  );
};

export default LoginAccount;
