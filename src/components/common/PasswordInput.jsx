import React, { useState } from "react";
import "./PasswordInput.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";

const PasswordInput = ({ inputClass, type, passwordRef }) => {
  const [showPassword, setShowPassword] = useState(false);

  const showClickHandle = () => {
    setShowPassword(!showPassword);
  };

  const placeholder =
    type === "pwChk"
      ? "비밀번호를 다시 한번 입력해주세요"
      : "숫자, 특수문자를 포함한 8자 이상의 비밀번호";

  const name = type === "pwChk" ? "passwordChk" : "password";

  return (
    <>
      <div className="password-input-wrap">
        <input
          type={!showPassword ? "password" : "text"}
          className={inputClass}
          placeholder={placeholder}
          name={name}
          required
          ref={passwordRef}
        />
        <ReactSVG
          src={!showPassword ? svgCollection.views : svgCollection.eyeSlash}
          className={`password-img ${
            !showPassword ? "hide-password" : "show-password"
          }`}
          onClick={showClickHandle}
        />
      </div>
    </>
  );
};

export default PasswordInput;
