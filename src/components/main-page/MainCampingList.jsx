import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../main-page/MainCampingList.css";
import { ReactSVG } from "react-svg";
import heart from "../../assets/svg/heart.svg";
import star from "../../assets/svg/star.svg";
import useHeartClick from "../../hooks/useHeartClick";
import useCampingPlaceFilter from "../../hooks/useCampingPlaceFilter";
import { get } from "../../utils/Api";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";

const MainCampingList = () => {
  const [campingPlaces, setCampingPlaces] = useState([]);

  const [error, setError] = useState(null);

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchCampingPlaces = async () => {
      try {
        const response = await get("camp");
        setCampingPlaces(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCampingPlaces();
  }, []);

  // useCampingPlaceFilter 훅에 API 데이터를 전달
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(campingPlaces);

  const { heartClick, heartClickHandler, heartIcon } = useHeartClick([]);

  if (error) return <div>Error: {error}</div>; // 에러 발생 시 보여줄 UI

  return (
    <>
      <div className="camping-title-wraper">
        <div className="camping-title">캠핑장 리스트</div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="reservation">예약 많은 순</option>
          <option value="review">리뷰 많은 순</option>
          <option value="star">평점 좋은 순</option>
          <option value="heart">찜 많은 순</option>
        </select>
      </div>

      <div className="camping-list-wraper">
        {campingPlaceFiltered.map((campingPlace, index) => (
          <div key={index} className="camping-list">
            <Link to={`/camping/detail/${campingPlace.id}`}>
              <img className="camping-img" src={campingPlace.img} alt="" />

              <ReactSVG
                className={`camping-img-heart ${
                  !heartClick[index] && "camping-img-heart-delete"
                }`}
                src={heartIcon.heart}
                alt=""
                onClick={(e) => {
                  e.preventDefault();
                  heartClickHandler(index);
                }}
              />

              <div className="camping-name">{campingPlace.name}</div>
              <div className="camping-sub-title-wraper">
                <div className="camping-type">{campingPlace.type}</div>
                <div className="camping-price">{campingPlace.price}</div>
              </div>
            </Link>
            <div className="camping-info-icons-wraper">
              <div className="camping-info-star-wraper">
                <ReactSVG className="camping-info-star" src={star} alt="" />
                <div className="camping-info">{campingPlace.rating}</div>
                <div className="camping-info">
                  ・리뷰({campingPlace.reviews})
                </div>
              </div>
              <div className="camping-info-heart-wraper">
                <ReactSVG className="camping-info-heart" src={heart} alt="" />
                <div className="camping-info">{campingPlace.heart}</div>
                <div className="camping-info">
                  ・예약({campingPlace.reservations})
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainCampingList;
