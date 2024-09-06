import React, { useState } from "react";
import { filterData } from "../utils/filterData";
import { useLoadMore } from "../hooks/useLoadMore";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";
import { noticeData } from "../mock/noticeData";
import useBookList from "../hooks/useBookList";
import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";
import "../components/admin-book-page/AdminBookListPage.css";

const AdminBookListPage = () => {
  const { book, error } = useBookList();
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
      {campingPlaceFiltered.length > 0 ? (
        campingPlaceFiltered.map((book) => (
          <div key={book.bookId} className="book-list-ex">
            <div className="admin-book-list-ex">
              [{book.campName}] {new Date(book.startDate).toLocaleDateString()}
              일 예약 - {book.bookNum}명 {book.bookStatus}
            </div>
          </div>
        ))
      ) : (
        <div>예약된 데이터가 없습니다.</div>
      )}
    </div>
  );
};

export default AdminBookListPage;
