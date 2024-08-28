import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { filterData } from "../utils/filterData";
import { useLoadMore } from "../hooks/useLoadMore";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";
import { noticeData } from "../mock/noticeData";
import SaveMoreBtn from "../components/save-page/SaveMoreBtn";
import useBookList from "../hooks/useBookList";
import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";
import "../components/admin-book-page/AdminBookListPage.css";

const AdminBookListPage = () => {
  const { book = [], error } = useBookList(); // book의 초기값을 빈 배열로 설정
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(book);

  const [filter, setFilter] = useState("all");
  const filteredItems = filterData(noticeData, filter, "noticeStatus");
  const { visibleItems, loadMore, hasMoreItems } = useLoadMore(
    3,
    filteredItems
  );

  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  return (
    <div>
      <div className="admin-book-title">예약 조회</div>
      <AdminMainLink />
      {campingPlaceFiltered.map((book) => (
        <div key={book.bookId} className="book-list-ex">
          <div className="admin-book-list-ex">
            [{book.campName}] {new Date(book.startDate).toLocaleDateString()}일
            예약 - {book.bookNum}명 {book.bookStatus}
          </div>
          <Link to={`/admin/book-detail/${book.bookId}`}>
            <span>
              <ReactSVG
                className="book-list-chevron"
                src="/assets/svg/chevron-right.svg" // 경로 수정
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
