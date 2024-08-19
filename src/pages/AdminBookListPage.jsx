import React from "react";
import { Link } from "react-router-dom";
import "../components/admin-book-page/AdminBookListPage.css";
import { ReactSVG } from "react-svg";

const AdminBookListPage = () => {
  return (
    <div>
      <Link to={"/admin"}>
        <ReactSVG
          className="admin-home-icon"
          src="../../src/assets/svg/home.svg"
          alt=""
        />
      </Link>
      <div className="admin-book-title">예약 조회</div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <Link to={"/admin/book-detail"}>
          <span className="book-list-chevron">
            <img src="../../src/assets/svg/chevron-right.svg" alt="" />
          </span>
        </Link>
      </div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <Link to={"/admin/book-detail"}>
          <span className="book-list-chevron">
            <img src="../../src/assets/svg/chevron-right.svg" alt="" />
          </span>
        </Link>
      </div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <Link to={"/admin/book-detail"}>
          <span className="book-list-chevron">
            <img src="../../src/assets/svg/chevron-right.svg" alt="" />
          </span>
        </Link>
      </div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <Link to={"/admin/book-detail"}>
          <span className="book-list-chevron">
            <img src="../../src/assets/svg/chevron-right.svg" alt="" />
          </span>
        </Link>
      </div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <Link to={"/admin/book-detail"}>
          <span className="book-list-chevron">
            <img src="../../src/assets/svg/chevron-right.svg" alt="" />
          </span>
        </Link>
      </div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <Link to={"/admin/book-detail"}>
          <span className="book-list-chevron">
            <img src="../../src/assets/svg/chevron-right.svg" alt="" />
          </span>
        </Link>
      </div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <Link to={"/admin/book-detail"}>
          <span className="book-list-chevron">
            <img src="../../src/assets/svg/chevron-right.svg" alt="" />
          </span>
        </Link>
      </div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <Link to={"/admin/book-detail"}>
          <span className="book-list-chevron">
            <img src="../../src/assets/svg/chevron-right.svg" alt="" />
          </span>
        </Link>
      </div>

      <div className="book-list-container">
        <button className="book-list-plus">더보기</button>
      </div>
    </div>
  );
};

export default AdminBookListPage;
