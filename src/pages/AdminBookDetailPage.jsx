import React from "react";
import { Link } from "react-router-dom";
import "../components/admin-book-page/AdminBookDetail.css";
import { ReactSVG } from "react-svg";

const AdminBookDetailPage = () => {
  return (
    <div>
      <Link to={"/admin"}>
        <ReactSVG
          className="admin-home-icon"
          src="../../src/assets/svg/home.svg"
          alt=""
        />
      </Link>
      <div className="admin-book-detail-title">예약 상세 조회</div>
      <div className="admin-book-camping-title">캠핑장 이름</div>
      <div className="admin-book-person-title">예약자 정보</div>
      <div>
        <span className="admin-book-name">이름</span>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className="input-book-name"
          readOnly
        />
      </div>
      <div className="admin-book-number">
        <span className="admin-book-phone-number">연락처</span>
        <input
          id="phone"
          name="phone"
          type="number"
          autoComplete="phone"
          className="input-book-phone-number"
          readOnly
        />
      </div>
      <div className="admin-book-text">
        <span className="admin-book-plus-text">요청사항</span>
        <input
          id="text"
          name="text"
          type="text"
          autoComplete="text"
          className="input-book-plus-text"
          readOnly
        />
      </div>
      <div className="admin-book-info">
        <div className="book-price-title">금액 /1박</div>
        <div className="book-price-title">추가 요금 /인당</div>
      </div>
      <div className="contact-info">
        <div>
          <input
            id="book-price"
            name="book-price"
            type="number"
            autoComplete="book-price"
            className="input-book-price"
            required
          />
          <span className="won">원</span>
        </div>
        <div>
          <input
            id="book-plus-price"
            name="book-plus-price"
            type="number"
            autoComplete="camp-price"
            className="input-plus-price"
            required
          />
          <span className="won">원</span>
        </div>
      </div>
      <div className="camp-user-title">
        <div className="book-user-title">예약 인원</div>
        <div className="camp-max-user-title">최대 인원</div>
        <div className="book-total-price-title">총 금액 /n박</div>
      </div>
      <div className="camping-info">
        <div>
          <input
            id="book-user-number"
            name="book-user-number"
            type="number"
            autoComplete="book-user-number"
            className="input-book-user-number"
            readOnly
          />
          <span className="camping-user">명</span>
        </div>
        <div>
          <input
            id="max-user"
            name="max-user"
            type="number"
            autoComplete="max-user"
            className="input-max-user"
            readOnly
          />
          <span className="camping-user">명</span>
        </div>
        <div>
          <input
            id="total-price"
            name="total-price"
            type="number"
            autoComplete="total-price"
            className="input-total-price"
            readOnly
          />
          <span className="won">원</span>
        </div>
      </div>
    </div>
  );
};

export default AdminBookDetailPage;
