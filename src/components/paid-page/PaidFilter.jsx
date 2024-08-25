import React from "react";

const PaidFilter = ({
  filterChangeHandle,
  filterType,
  wrapClassName,
  allClassName,
}) => {
  return (
    <div className={wrapClassName}>
      <button
        className={allClassName}
        onClick={() => filterChangeHandle("all")}
      >
        전체 보기
      </button>
      {filterType.map((filtering) => (
        <button
          className={filtering.class}
          key={filtering.type}
          onClick={() => filterChangeHandle(filtering.status)}
        >
          {filtering.type}
        </button>
      ))}
    </div>
  );
};

export default PaidFilter;
