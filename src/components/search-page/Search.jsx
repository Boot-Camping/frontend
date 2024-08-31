import React, { useState, useEffect } from "react";
import "../search-page/Search.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import useSearch from "../../hooks/useSearch";
import useWishlist from "../../hooks/useWishlist";

const Search = () => {
  const {
    searchText,
    setSearchText,
    searchHistory,
    searchResults,
    error,
    searchSubmitHandle,
    historyItemDelete,
  } = useSearch();
  const { isSaved, toggleWishlist } = useWishlist(searchResults);

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

      {/* 조건부 렌더링을 사용해 검색 기록이 있을 때만 표시 */}
      {searchHistory.length > 0 && (
        <div className="search-block">
          <div className="search-history">최근 검색 기록</div>
          <div>
            {searchHistory.map((item, index) => (
              <div className="search-history-list-wraper" key={index}>
                <div className="search-history-list">{item}</div>
                <button
                  className="search-history-delete-btn"
                  onClick={() => historyItemDelete(item)}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 검색 결과 표시 */}
      {error && <div className="error-message">{error}</div>}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((campingPlace, index) => (
            <div key={campingPlace.id} className="search-camping-list">
              <img
                className="search-camping-img"
                src={campingPlace.imageUrls[0] || "default-image-url.jpg"}
                alt=""
              />

              <ReactSVG
                className={`search-camping-img-heart ${
                  !isSaved[index] && "search-camping-img-heart-delete"
                }`}
                src={svgCollection.heart}
                alt=""
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(index, campingPlace);
                }}
              />

              <div className="search-camping-type">
                {campingPlace.categories.join(", ")}
              </div>
              <div className="search-camping-sub-title-wrapper">
                <div className="search-camping-name">{campingPlace.name}</div>
                <div className="search-camping-price">
                  {campingPlace.price}원
                </div>
              </div>
              <div className="search-camping-addr-wrapper">
                <div className="search-camping-addr-icon-wrapper">
                  <ReactSVG
                    className="search-camping-addr-icon"
                    src={svgCollection.location}
                    alt="위치"
                  />
                  <div className="search-camping-addr">{campingPlace.addr}</div>
                </div>
                <div className="search-camping-people">
                  기준인원/{campingPlace.standardNum}
                </div>
              </div>
              <div className="search-camping-info-icons-wrapper">
                <div className="search-camping-info-star-wrapper">
                  <ReactSVG
                    className="search-camping-info-star"
                    src={svgCollection.stars}
                    alt=""
                  />
                  <div className="search-camping-info">
                    {campingPlace.averageGrade}
                  </div>
                  <div className="search-camping-info">
                    ・리뷰({campingPlace.reviewCount})
                  </div>
                </div>
                <div className="search-camping-info">
                  예약({campingPlace.reservedDateCount})
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
