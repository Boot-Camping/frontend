import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../components/admin-book-page/AdminBookDetail.css";
import { campBookData } from "../mock/campBookData";
import { ReactSVG } from "react-svg";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";
import { svgCollection } from "../constants/svgCollection";

const AdminBookDetailPage = () => {
  const { id } = useParams();
  const booking = campBookData.find((item) => item.id === parseInt(id));
  const navigate = useNavigate();

  if (!booking) {
    return <div>예약 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <AdminMainLink />
      <div className="admin-book-detail-title">예약 상세 조회</div>
      <ReactSVG
        src={svgCollection.prev}
        className="notice-move-prev"
        onClick={() => navigate(-1)}
      />
      <span className="admin-book-camping-title">[ {booking.campName} ]</span>
      <div>
        <span className="admin-book-name">이름</span>
        <input
          id="name"
          name="name"
          type="text"
          value={booking.userName}
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
          value={booking.phoneNum}
          className="input-book-phone-number"
          readOnly
        />
      </div>
      <div className="admin-book-text">
        <div className="admin-book-plus-text">요청사항</div>
        <textarea
          id="text"
          name="text"
          value={booking.request}
          className="input-book-plus-text"
          readOnly
        />
      </div>
      <div className="admin-book-info">
        <div className="book-price-title">금액 /1박</div>
        <div className="book-price-title">추가 요금 /인당</div>
        <div className="book-price-title">예약 일수</div>
      </div>
      <div className="contact-info">
        <div>
          <input
            id="book-price"
            name="book-price"
            type="number"
            value={booking.price}
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
            value={booking.overCharge}
            className="input-plus-price"
            required
          />
          <span className="won">원</span>
        </div>
        <div>
          <input
            id="book-plus-price"
            name="book-plus-price"
            type="number"
            value={booking.totalDate}
            className="input-total-date"
            required
          />
          <span className="won">박</span>
        </div>
      </div>
      <div className="camp-user-title">
        <div className="book-user-title">예약 인원</div>
        <div className="camp-max-user-title">추가 인원</div>
        <div className="book-total-price-title">총 금액</div>
      </div>
      <div className="camping-info">
        <div>
          <input
            id="book-user-number"
            name="book-user-number"
            type="number"
            value={booking.bookNum}
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
            value={booking.plusNum}
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
            value={booking.totalPrice}
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
