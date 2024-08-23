import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { campBookData } from "../constants/campBookData"; // 목업 데이터 가져오기
import "../components/admin-book-page/AdminBookListPage.css";

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
      {campBookData.map((booking) => (
        <div key={booking.id} className="book-list-ex">
          <div>
            [{booking.campName}] {booking.totalDate}일 예약 - {booking.userName}{" "}
            {booking.bookNum}명
          </div>
          <Link to={`/admin/book-detail/${booking.id}`}>
            <span>
              <ReactSVG
                className="book-list-chevron"
                src="../../src/assets/svg/chevron-right.svg"
                alt=""
              />
            </span>
          </Link>
        </div>
      ))}
      <div className="book-list-container">
        <button className="book-list-plus">더보기</button>
      </div>
    </div>
  );
};

export default AdminBookListPage;
