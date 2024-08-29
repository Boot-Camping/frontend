import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../category-page/CategoryCampingList.css";
import { ReactSVG } from "react-svg";
import useHeartClick from "../../hooks/useHeartClick";
import useCampingPlaceFilter from "../../hooks/useCampingPlaceFilter";
// import useFetchCampingList from "../../hooks/useFetchCampingList";
import { svgCollection } from "../../constants/svgCollection";
import campingPlaces from "../../mock/campingPlaces";

const CategoryCampingList = () => {
  const { category } = useParams(); // URL에서 category 값을 가져옴

  const categoryTitle = category || "전체";

  // 카테고리 필터링
  const categoryfilter = campingPlaces.filter(
    (place) =>
      categoryTitle === "전체" || place.categories.includes(categoryTitle)
  );

  //백 서버오류로 인한 api 연결 잠시 중단
  // const { campingPlaces, error } = useFetchCampingList();

  // if (error) return <div>Error: {error}</div>;

  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(categoryfilter);

  const { heartClick, heartClickHandler } = useHeartClick([]);

  return (
    <>
      <div className="category-title-wrapper">
        <div className="category-title">{categoryTitle}</div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="updatedAt">최근 등록 순</option>
          <option value="reservedDateCount">예약 많은 순</option>
          <option value="reviewCount">리뷰 많은 순</option>
          <option value="averageGrade">평점 좋은 순</option>
        </select>
      </div>

      {campingPlaceFiltered.map((campingPlace, index) => (
        <div key={campingPlace.id} className="category-camping-list">
          <img
            className="category-camping-img"
            src={campingPlace.imageUrls[0] || "default-image-url.jpg"}
            alt=""
          />

          <ReactSVG
            className={`category-camping-img-heart ${
              !heartClick[index] && "category-camping-img-heart-delete"
            }`}
            src={svgCollection.heart}
            alt=""
            onClick={(e) => {
              e.preventDefault();
              heartClickHandler(index);
            }}
          />

          <div className="category-camping-type">
            {campingPlace.categories.join(", ")}
          </div>
          <div className="category-camping-sub-title-wrapper">
            <div className="category-camping-name">{campingPlace.name}</div>
            <div className="category-camping-price">{campingPlace.price}원</div>
          </div>
          <div className="category-camping-addr-wrapper">
            <div className="category-camping-addr-icon-wrapper">
              <ReactSVG
                className="category-camping-addr-icon"
                src={svgCollection.location}
                alt="위치"
              />
              <div className="category-camping-addr">{campingPlace.addr}</div>
            </div>
            <div className="category-camping-people">
              기준인원/{campingPlace.standardNum}
            </div>
          </div>
          <div className="category-camping-info-icons-wrapper">
            <div className="category-camping-info-star-wrapper">
              <ReactSVG
                className="category-camping-info-star"
                src={svgCollection.stars}
                alt=""
              />
              <div className="category-camping-info">
                {campingPlace.averageGrade}
              </div>
              <div className="category-camping-info">
                ・리뷰({campingPlace.reviewCount})
              </div>
            </div>
            <div className="category-camping-info">
              예약({campingPlace.reservedDateCount})
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryCampingList;
