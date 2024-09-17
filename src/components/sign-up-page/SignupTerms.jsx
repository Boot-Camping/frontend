import React from "react";
import "./SignupTerms.css";
import { signUpTerms } from "../../constants/signUp";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";

const SignupTerms = ({ checkedTerms, setCheckedTerms, setErrorFocus }) => {
  const checkAllHandle = (event) => {
    const isChecked = event.target.checked;
    setCheckedTerms(new Array(signUpTerms.length).fill(isChecked));
  };

  const isCheckedHandle = (index) => (event) => {
    const newChckedTerms = [...checkedTerms];
    newChckedTerms[index] = event.target.checked;
    setCheckedTerms(newChckedTerms);
  };

  const allChecked = checkedTerms.every(Boolean);

	const setFocusForChecked = (el) => {
		if(el) {
			setErrorFocus(el);
		}
	}

  return (
    <div className="signup-terms">
      <div className="signup-terms-title">가입 약관을 읽고 동의해 주세요</div>
      <div className="chk-wrap chk-all">
        <input
          className="chk-box"
          type="checkbox"
          id="chk-all"
          checked={allChecked}
          onChange={checkAllHandle}
        />
        <label className="chk-content" htmlFor="chk-all">
          <ReactSVG src={svgCollection.check} className="signup-check-img" />
          <div className="chk-all-content">
            <div>모두 동의</div>
            <div>서비스 이용을 위해 아래 약관에 모두 동의합니다</div>
          </div>
        </label>
      </div>
      {signUpTerms.map((terms, index) => (
        <div className="chk-wrap" key={terms.key}>
          <input
            className="chk-box"
            type="checkbox"
            id={terms.key}
            checked={checkedTerms[index]}
            onChange={isCheckedHandle(index)}
            ref={setFocusForChecked}
          />
          <label className="chk-content" htmlFor={terms.key}>
            <ReactSVG src={svgCollection.check} className="signup-check-img" />
            {terms.content}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SignupTerms;
