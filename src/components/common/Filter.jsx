import React, { useState } from "react";
import "./Filter.css";

const Filter = ({
  filterChangeHandle,
  filterType,
  wrapClassName,
  allClassName,
}) => {
  const [activeFilter, setActiveFilter] = useState(0);

  const filterClickHandle = (status, index) => {
    filterChangeHandle(status);
    setActiveFilter(index);
  };

  return (
    <div className={`${wrapClassName} filter-wrap`}>
      <button
        className={`${allClassName} filter ${
          activeFilter === 0 ? "filter-active" : ""
        }`}
        onClick={() => filterClickHandle("all", 0)}
      >
        전체 보기
      </button>
      {filterType.map((filtering, index) => (
        <button
          className={`${filtering.class} filter ${
            activeFilter === index + 1 ? "filter-active" : ""
          }`}
          key={filtering.type}
          onClick={() => filterClickHandle(filtering.status, index + 1)}
        >
          {filtering.type}
        </button>
      ))}
    </div>
  );
};

export default Filter;
