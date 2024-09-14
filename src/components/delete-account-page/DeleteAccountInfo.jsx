import React from "react";
import "./DeleteAccountInfo.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import { deleteInfoList } from "../../constants/deleteAccount";

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
      {deleteInfoList.map((deleteInfo) => (
        <ul className="delete-info" key={deleteInfo.key}>
          <li className="delete-info-title">{deleteInfo.title}</li>
          <li className="delete-info-desc">{deleteInfo.desc}</li>
        </ul>
      ))}
    </>
  );
};

export default DeleteAccountInfo;
