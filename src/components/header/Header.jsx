import React from "react";
import "../header/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <img className="logo" src="/assets/camping.png" alt="" />
      </Link>
      <div className="header-icons">
        <img src="/assets/bellImg.svg" alt="" />
        <Link to={"/mypage"}>
          <img src="/assets/userImg.svg" alt="" />
        </Link>
        <img src="/assets/searchImg.svg" alt="" />
      </div>
    </div>
  );
};

export default Header;
