import React from "react";
import "./DeleteConfirm.css";
import { ReactSVG } from "react-svg";
import check from "/src/assets/svg/check.svg";

const DeleteConfirm = ({ passwordRef, checkboxRef }) => {
  return (
    <>
      <div className="delete-confirm">
        <label>비밀번호 입력</label>
        <input
          type="password"
          name="password"
          placeholder="현재 비밀번호를 입력해주세요"
          required
          ref={passwordRef}
        />
      </div>

      <div className="delete-confirm-chk">
        <input type="checkbox" id="delete-chk" ref={checkboxRef} />
        <label htmlFor="delete-chk">
          <ReactSVG src={check} className="delete-chk-img" />
          <div>위 내용을 모두 확인하였으며, 이에 동의합니다</div>
        </label>
      </div>
    </>
  );
};

export default DeleteConfirm;
