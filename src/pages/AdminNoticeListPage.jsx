import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../components/admin-notice-register/AdminNoticeListPage.css";
import { ReactSVG } from "react-svg";

const AdminNoticeListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleCategory = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div>
      <Link to={"/admin"}>
        <ReactSVG
          className="admin-home-icon"
          src="../../src/assets/svg/home.svg"
          alt=""
        />
      </Link>
      <div className="notice-page-title">공지사항</div>
      <div className="list-notice-category">
        <button
          className={`list-category-notice ${
            selectedCategory === "공지사항" ? "selected" : ""
          }`}
          onClick={() => toggleCategory("공지사항")}
        >
          공지사항
        </button>
        <button
          className={`list-category-event ${
            selectedCategory === "이벤트" ? "selected" : ""
          }`}
          onClick={() => toggleCategory("이벤트")}
        >
          이벤트
        </button>
      </div>
      <div className="notice-regi-btn">
        <Link to={"/admin/notice-regi"}>
          <button className="notice-register-btn">+ 등록</button>
        </Link>
      </div>

      <div className="notice-list-ex">
        <div>[공지사항] 개인정보 처리방침 개정 안내</div>
        <span>
          <Link to={"/admin/notice-fix"}>
            <ReactSVG
              className="list-pencil"
              src="../../src/assets/svg/pencil.svg"
              alt=""
            />
          </Link>
        </span>
      </div>
      <div className="notice-list-ex">
        <div>[공지사항] 6월 6일(목) 현충일 고객센터 휴무</div>
        <span>
          <Link to={"/admin/notice-fix"}>
            <ReactSVG
              className="list-pencil"
              src="../../src/assets/svg/pencil.svg"
              alt=""
            />
          </Link>
        </span>
      </div>
      <div className="notice-list-ex">
        <div>[공지사항] 개인정보 처리방침 개정 안내</div>
        <span>
          <Link to={"/admin/notice-fix"}>
            <ReactSVG
              className="list-pencil"
              src="../../src/assets/svg/pencil.svg"
              alt=""
            />
          </Link>
        </span>
      </div>
      <div className="notice-list-ex">
        <div>[공지사항] 6월 6일(목) 현충일 고객센터 휴무</div>
        <span>
          <Link to={"/admin/notice-fix"}>
            <ReactSVG
              className="list-pencil"
              src="../../src/assets/svg/pencil.svg"
              alt=""
            />
          </Link>
        </span>
      </div>
      <div className="notice-list-ex">
        <div>[공지사항] 개인정보 처리방침 개정 안내</div>
        <span>
          <Link to={"/admin/notice-fix"}>
            <ReactSVG
              className="list-pencil"
              src="../../src/assets/svg/pencil.svg"
              alt=""
            />
          </Link>
        </span>
      </div>
      <div className="notice-list-ex">
        <div>[공지사항] 6월 6일(목) 현충일 고객센터 휴무</div>
        <span>
          <Link to={"/admin/notice-fix"}>
            <ReactSVG
              className="list-pencil"
              src="../../src/assets/svg/pencil.svg"
              alt=""
            />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default AdminNoticeListPage;
