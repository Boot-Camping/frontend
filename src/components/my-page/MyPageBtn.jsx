import React from "react";
import "./MyPageBtn.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";

const MyPageBtn = ({ btn }) => {
  return (
    <Link to={btn.link} className={`mypage-btn ${btn.key}`}>
      <ReactSVG src={svgCollection[btn.src]} className="mypage-btn-icon" />
      <div>{btn.txt}</div>
    </Link>
  );
};

export default MyPageBtn;
