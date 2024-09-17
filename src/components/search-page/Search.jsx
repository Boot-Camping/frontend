import React from "react";
import "../search-page/Search.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import useWishlist from "../../hooks/useWishlist";
import useSearch from "../../hooks/useSearch";
import { Link } from "react-router-dom";

const Search = () => {
  const {
    searchText,
    setSearchText,
    searchHistory,
    searchResults,
    error,
    selectedAddr,
    setSelectedAddr,
    searchSubmitHandle,
    historyClickHandle,
    historyItemDelete,
  } = useSearch();

  const { isSaved, toggleWishlist } = useWishlist(searchResults);

  return (
    <>
      <div className="search-title">캠핑장 검색</div>
      <div className="search">
        <select
          className="search-addr"
          value={selectedAddr}
          onChange={(e) => setSelectedAddr(e.target.value)}
        >
          <option value="all-addr">지역 선택</option>
          <option value="서울">서울</option>
          <option value="경기">경기</option>
          <option value="인천">인천</option>
          <option value="강원">강원</option>
          <option value="경상도">경상도</option>
          <option value="충청도">충청도</option>
          <option value="전라도">전라도</option>
          <option value="제주도">제주도</option>
        </select>

        <input
          className="search-text"
          type="text"
          id="search"
          placeholder="...검색어 또는 지역 선택 후 검색해주세요"
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

      {searchHistory.length > 0 && (
        <div className="search-block">
          <div className="search-history">최근 검색 기록</div>
          <div>
            {searchHistory.map((item, index) => (
              <div className="search-history-list-wraper" key={index}>
                <div
                  className="search-history-list"
                  onClick={() => historyClickHandle(item)}
                >
                  {item}
                </div>
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

      {error && <div className="error-message">{error}</div>}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((campingPlace, index) => (
            <div key={campingPlace.id} className="search-camping-list">
              <Link to={`/camping/detail/${campingPlace.id}`}>
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
                    {campingPlace.price.toLocaleString()}원
                  </div>
                </div>
                <div className="search-camping-addr-wrapper">
                  <div className="search-camping-addr-icon-wrapper">
                    <ReactSVG
                      className="search-camping-addr-icon"
                      src={svgCollection.location}
                      alt="위치"
                    />
                    <div className="search-camping-addr">
                      {campingPlace.addr}
                    </div>
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
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
