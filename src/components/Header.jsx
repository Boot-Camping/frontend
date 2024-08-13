import React from "react";
import "../css/Header.css";

const Header = () => {
  return (
    <div>
      <div className="header-img">
        <img className="camping-png" src="/assets/camping.png" alt="" />
        <div className="header-svg">
          <img src="/assets/bellImg.svg" alt="" />
          <img src="/assets/userImg.svg" alt="" />
          <img src="/assets/searchImg.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
