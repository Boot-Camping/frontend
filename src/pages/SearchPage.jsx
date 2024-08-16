import React, { useState } from "react";
import "../components/search-page/SearchPage.css";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");

  const searchSubmitHandle = (e) => {
    e.preventDefault();
    setSearchText("");
    console.log(searchText);
  };

  return (
    <>
      <div className="search-title">검색</div>
      <div className="search">
        <select className="search-area">
          <option value="all-area">전체 지역</option>
          <option value="경기">경기</option>
          <option value="인천">인천</option>
          <option value="강원">강원</option>
          <option value="대전">대전</option>
          <option value="세종">세종</option>
          <option value="충북">충북</option>
          <option value="충남">충남</option>
          <option value="대구">대구</option>
          <option value="울산">울산</option>
          <option value="경북">경북</option>
          <option value="경남">경남</option>
          <option value="전북">전북</option>
          <option value="전남">전남</option>
          <option value="제주">제주</option>
        </select>

        <input
          className="search-text"
          type="text"
          id="search"
          placeholder="캠핑장 검색"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          className="search-submit-Btn"
          type="submit"
          value="검색"
          onClick={searchSubmitHandle}
        >
          검색
        </button>
      </div>

      <div className="search-block"></div>
    </>
  );
};

export default SearchPage;
