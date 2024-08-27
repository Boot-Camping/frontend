import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { campBookData } from "../mock/campBookData"; // 목업 데이터 가져오기
import { filterData } from "../utils/filterData";
import { useLoadMore } from "../hooks/useLoadMore";
import { noticeData } from "../constants/notice";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";
import SaveMoreBtn from "../components/save-page/SaveMoreBtn";
import "../components/admin-book-page/AdminBookListPage.css";

const AdminBookListPage = () => {
  const [filter, setFilter] = useState("all");
  const filteredItems = filterData(noticeData, filter, "noticeStatus");
  const { visibleItems, loadMore, hasMoreItems } = useLoadMore(
    3,
    filteredItems
  );

  return (
    <div>
      <AdminMainLink />
      <div className="admin-book-title">예약 조회</div>
      {campBookData.map((booking) => (
        <div key={booking.id} className="book-list-ex">
          <div className="admin-book-list-ex">
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
      {hasMoreItems && (
        <SaveMoreBtn onClick={loadMore} hasMoreItems={hasMoreItems} />
      )}
    </div>
  );
};

export default AdminBookListPage;
