import React from "react";
import "./DeleteConfirm.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import PasswordInput from "../common/PasswordInput";

const DeleteConfirm = ({ idRef, passwordRef, checkboxRef }) => {
  return (
    <>
      <div className="delete-confirm">
        <label>아이디 입력</label>
        <input
          type="text"
          name="loginId"
          placeholder="현재 아이디를 입력해주세요"
          required
          ref={idRef}
        />
      </div>

      <div className="delete-confirm">
        <label>비밀번호 입력</label>
				<PasswordInput passwordRef={passwordRef} />
      </div>

      <div className="delete-confirm-chk">
        <input type="checkbox" id="delete-chk" ref={checkboxRef} />
        <label htmlFor="delete-chk">
          <ReactSVG src={svgCollection.check} className="delete-chk-img" />
          <div>위 내용을 모두 확인하였으며, 이에 동의합니다</div>
        </label>
      </div>
    </>
  );
};

export default DeleteConfirm;
