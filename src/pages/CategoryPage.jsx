import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../components/category-page/CategoryPage.css";
import { ReactSVG } from "react-svg";
import location from "../assets/svg/location.svg";
import star from "../assets//svg/star.svg";
import useHeartClick from "../hooks/useHeartClick";
import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";
import { get } from "../utils/Api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const CategoryPage = () => {
  const { category } = useParams(); // URL에서 category 값을 가져옴

  const [campingPlaces, setCampingPlaces] = useState([]);
  const [error, setError] = useState(null);
  const { accessToken } = getUserIdFromToken();

  useEffect(() => {
    const fetchCampingPlaces = async () => {
      const customHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };
      try {
        const response = await get("camp", customHeaders);
        setCampingPlaces(response.content); // 응답 데이터의 'content' 사용
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCampingPlaces();
  }, [accessToken]);

  // useCampingPlaceFilter 훅에 API 데이터를 전달
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(campingPlaces);

  const { heartClick, heartClickHandler, heartIcon } = useHeartClick([]);

  if (error) return <div>Error: {error}</div>; // 에러 발생 시 표시할 UI

  // 전달된 category 값을 사용하여 categoryTitle을 설정합니다. 기본값은 "전체"
  const categoryTitle = category || "전체";

  return (
    <>
      <div className="category-title-wrapper">
        <div className="category-title">{categoryTitle}</div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="reservation">예약 많은 순</option>
          <option value="review">리뷰 많은 순</option>
          <option value="star">평점 좋은 순</option>
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
            src={heartIcon.heart}
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
                src={location}
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
                src={star}
                alt=""
              />
              <div className="category-camping-info">
                {campingPlace.gradeCount}
              </div>
              <div className="category-camping-info">
                ・리뷰({campingPlace.reviewCount})
              </div>
            </div>
            <div className="category-camping-info">
              예약({campingPlace.reviewCount})
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryPage;
