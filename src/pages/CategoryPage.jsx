import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../components/category-page/CategoryPage.css";
import { ReactSVG } from "react-svg";
import heart from "../assets/svg/heart.svg";
import location from "../assets/svg/location.svg";
import star from "../assets//svg/star.svg";
import useHeartClick from "../hooks/useHeartClick";
import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";
import { get } from "../utils/Api";

const CategoryPage = () => {
  const { category } = useParams(); // URL에서 category 값을 가져옴
  const [campingPlaces, setCampingPlaces] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampingPlaces = async () => {
      try {
        const response = await get("/api/camp"); // API 호출
        console.log(response.data);
        setCampingPlaces(response.data); // 받아온 데이터를 상태에 저장
      } catch (err) {
        setError(err.message); // 에러 메시지 상태에 저장
      }
    };

    fetchCampingPlaces();
  }, []);

  // useCampingPlaceFilter 훅에 API 데이터를 전달
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(campingPlaces);

  const { heartClick, heartClickHandler, heartIcon } = useHeartClick([]);

  if (error) return <div>Error: {error}</div>; // 에러 발생 시 표시할 UI

  // 전달된 category 값을 사용하여 categoryTitle을 설정합니다. 기본값은 "전체"
  const categoryTitle = category || "전체";

  return (
    <>
      <div className="category-title-wraper">
        <div className="category-title">{categoryTitle}</div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="reservation">예약 많은 순</option>
          <option value="review">리뷰 많은 순</option>
          <option value="star">평점 좋은 순</option>
          <option value="hart">찜 많은 순</option>
        </select>
      </div>

      {campingPlaceFiltered.map((campingPlace, index) => (
        <div key={campingPlace.id} className="category-camping-list">
          <img className="category-camping-img" src={campingPlace.img} alt="" />

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

          <div className="category-camping-type">{campingPlace.type}</div>
          <div className="category-camping-sub-title-wraper">
            <div className="category-camping-name">{campingPlace.name}</div>
            <div className="category-camping-price">{campingPlace.price}</div>
          </div>
          <div className="category-camping-location-wraper">
            <div className="category-camping-location-icon-wraper">
              <ReactSVG
                className="category-camping-location-icon"
                src={location}
                alt="위치"
              />
              <div className="category-camping-location">
                {campingPlace.location}
              </div>
            </div>
            <div className="category-camping-people">{campingPlace.people}</div>
          </div>
          <div className="category-camping-info-icons-wraper">
            <div className="category-camping-info-star-wraper">
              <ReactSVG
                className="category-camping-info-star"
                src={star}
                alt="별점"
              />
              <div className="category-camping-info">{campingPlace.rating}</div>
              <div className="category-camping-info">
                ・리뷰({campingPlace.reviews})
              </div>
            </div>
            <div className="category-camping-info-heart-wraper">
              <ReactSVG
                className="category-camping-info-heart"
                src={heart}
                alt="찜"
              />
              <div className="category-camping-info">{campingPlace.heart}</div>
              <div className="category-camping-info">
                ・예약({campingPlace.reservations})
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryPage;
