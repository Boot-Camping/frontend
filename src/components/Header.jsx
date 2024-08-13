import React from "react";
import "../css/Header.css";

const Header = () => {
  return (
    <div>
      <div className="header">
        <img className="logo" src="/assets/camping.png" alt="" />
        <div className="header-icons">
          <img src="/assets/bellImg.svg" alt="" />
          <img src="/assets/userImg.svg" alt="" />
          <img src="/assets/searchImg.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
