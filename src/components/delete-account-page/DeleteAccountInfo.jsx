import React from "react";
import "./DeleteAccountInfo.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";

const DeleteAccountInfo = () => {
  return (
    <>
      <ul className="delete-account-title-wrap">
        <li>
          <Link to={"/userinfo"}>
            <ReactSVG
              src={svgCollection.prev}
              className="delete-account-move-prev"
            />
          </Link>
          <div>회원탈퇴</div>
        </li>
        <li>회원탈퇴를 하기 전에 안내사항을 꼭 확인해 주세요</li>
      </ul>
      <ul className="delete-info delete-unrecover">
        <li className="delete-info-title">아이디 재사용 및 복구 불가</li>
        <li className="delete-info-desc">
          사용하고 계신 아이디를 탈퇴하시면, 해당 아이디로 본인과 타인 모두
          재가입이 불가능합니다
        </li>
      </ul>
      <ul className="delete-info delete-keep">
        <li className="delete-info-title">리뷰 및 답글 유지</li>
        <li className="delete-info-desc">
          탈퇴 후에도 작성하신 리뷰 및 답글은 유지됩니다. 삭제를 원하시는 경우,
          반드시 탈퇴 전 삭제해주시기 바랍니다
        </li>
      </ul>
    </>
  );
};

export default DeleteAccountInfo;
