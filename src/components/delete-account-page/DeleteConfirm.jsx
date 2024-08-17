import React from "react";

const DeleteConfirm = () => {
  return (
    <>
      <div className="delete-confirm">
        <label>비밀번호 입력</label>
        <input type="password" placeholder="현재 비밀번호를 입력해주세요" />
      </div>

      <div>
        <label>위 내용을 모두 확인하였으며, 이에 동의합니다</label>
        <input type="checkbox" />
      </div>
    </>
  );
};

export default DeleteConfirm;
