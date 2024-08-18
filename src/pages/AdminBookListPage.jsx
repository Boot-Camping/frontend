import React from "react";
import { Link } from "react-router-dom";
import "../components/admin-book-page/AdminBookListPage.css";

const AdminBookListPage = () => {
  return (
    <div>
      <Link to={"/admin"}>
        <img
          className="admin-home-icon"
          src="../../src/assets/svg/home.svg"
          alt=""
        />
      </Link>
      <div className="admin-book-title">예약 조회</div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <span className="book-list-chevron">
          <img src="../../src/assets/svg/chevron-right.svg" alt="" />
        </span>
      </div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <span className="book-list-chevron">
          <img src="../../src/assets/svg/chevron-right.svg" alt="" />
        </span>
      </div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <span className="book-list-chevron">
          <img src="../../src/assets/svg/chevron-right.svg" alt="" />
        </span>
      </div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <span className="book-list-chevron">
          <img src="../../src/assets/svg/chevron-right.svg" alt="" />
        </span>
      </div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <span className="book-list-chevron">
          <img src="../../src/assets/svg/chevron-right.svg" alt="" />
        </span>
      </div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <span className="book-list-chevron">
          <img src="../../src/assets/svg/chevron-right.svg" alt="" />
        </span>
      </div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <span className="book-list-chevron">
          <img src="../../src/assets/svg/chevron-right.svg" alt="" />
        </span>
      </div>
      <div className="book-list-ex">
        <div>[캠핑지 이름] 8/12~8/16(금) 닉네임 n명 </div>
        <span className="book-list-chevron">
          <img src="../../src/assets/svg/chevron-right.svg" alt="" />
        </span>
      </div>

      <div className="book-list-container">
        <button className="book-list-plus">더보기</button>
      </div>
    </div>
  );
};

export default AdminBookListPage;
