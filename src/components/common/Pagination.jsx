import React from "react";
import "./Pagination.css";

const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="pagination-wrap">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={`page-btn${index + 1}`}
          className={`page-btn ${page === index ? "page-active" : ""}`}
          onClick={() => setPage(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
