import React from "react";
import "../header/Header.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

import logo from "/src/assets/image/camping.png";
import userImg from "/src/assets/svg/userImg.svg";
import searchImg from "/src/assets/svg/search.svg";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <img className="logo" src={logo} alt="" />
      </Link>

      <div className="icons">
        <Link to={"/mypage"}>
          <ReactSVG className="header-icon" src={userImg} alt="" />
        </Link>

        <Link to={"/SearchPage"}>
          <ReactSVG className="header-icon" src={searchImg} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
