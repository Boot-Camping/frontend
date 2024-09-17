import React from "react";
import "../header/Header.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

import logo from "/src/assets/image/logo0.png";
import userImg from "/src/assets/svg/userImg.svg";
import searchImg from "/src/assets/svg/search.svg";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";

const Header = () => {
  const { accessToken } = getUserIdFromToken();
  const isLoggedIn = !!accessToken; // accessToken이 있으면 로그인 상태로 간주

  return (
    <div className="header">
      <Link to={"/"}>
        <div className="logo-wrapper">
          <img className="logo" src={logo} alt="Logo" />
          <div className="logo-title">boot-camping</div>
        </div>
      </Link>
      <div className="icons">
        <Link to={isLoggedIn ? "/mypage" : "/login"}>
          <ReactSVG className="header-icon" src={userImg} alt="User Icon" />
        </Link>

        <Link to={"/SearchPage"}>
          <ReactSVG className="header-icon" src={searchImg} alt="Search Icon" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
