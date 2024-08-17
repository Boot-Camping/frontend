import React from "react";

const DeleteAccountInfo = () => {
  return (
    <>
      <ul className="delete-account-title-wrap">
        <li>회원탈퇴</li>
        <li>회원탈퇴를 하기 전에 안내사항을 꼭 확인해 주세요</li>
      </ul>
      <ul className="delete-info delete-unrecover">
        <li className="delete-info-title">아이디 재사용 및 복구 불가</li>
        <li>
          사용하고 계신 아이디를 탈퇴하시면 본인과 타인 모두 재사용 및 복구가
          불가합니다
        </li>
      </ul>
      <div className="delete-info delete-keep">
        <div className="delete-info-title">
          아래 게시물은 유지되며 삭제를 원하는 게시글이 있다면 반드시 탈퇴 전
          비공개 처리하거나 삭제하시기 바랍니다
        </div>
        <ul className="delete-keep-content">
          <li>
            <span>캠핑로그</span>
            <span>게시물, 댓글, 찜내역 등</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DeleteAccountInfo;
