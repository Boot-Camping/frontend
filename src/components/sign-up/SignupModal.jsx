import React from "react";

const SignupModal = ({ error, isOpened }) => {
  return (
    <div>{error && <div>우편번호와 주소는 필수 입력 사항입니다.</div>}</div>
  );
};

export default SignupModal;
