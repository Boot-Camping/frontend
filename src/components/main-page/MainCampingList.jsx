import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../main-page/MainCampingList.css";
import { ReactSVG } from "react-svg";
import star from "../../assets/svg/star.svg";
import useHeartClick from "../../hooks/useHeartClick";
import useCampingPlaceFilter from "../../hooks/useCampingPlaceFilter";
import { get } from "../../utils/Api";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";

const MainCampingList = () => {
  const [campingPlaces, setCampingPlaces] = useState([]);
  const [error, setError] = useState(null);
  const { accessToken } = getUserIdFromToken();

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchCampingPlaces = async () => {
      const customHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };
      try {
        const response = await get("camp", customHeaders);
        console.log(response.content);
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

  if (error) return <div>Error: {error}</div>; // 에러 발생 시 보여줄 UI

  return (
    <>
      <div className="camping-title-wrapper">
        <div className="camping-title">캠핑장 리스트</div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="reservation">예약 많은 순</option>
          <option value="review">리뷰 많은 순</option>
          <option value="star">평점 좋은 순</option>
        </select>
      </div>

      <div className="camping-list-wrapper">
        {campingPlaceFiltered.map((campingPlace, index) => (
          <div key={campingPlace.id} className="camping-list">
            <Link to={`/camping/detail/${campingPlace.id}`}>
              <img
                className="camping-img"
                src={campingPlace.imageUrls[0] || "default-image-url.jpg"}
                alt={campingPlace.name}
              />

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
              <div className="camping-sub-title-wrapper">
                <div className="camping-type">
                  {campingPlace.categories.join(". ")}
                </div>
                <div className="camping-price">{campingPlace.price}원</div>
              </div>
            </Link>
            <div className="camping-info-icons-wrapper">
              <div className="camping-info-star-wrapper">
                <ReactSVG className="camping-info-star" src={star} alt="" />
                <div className="camping-info">{campingPlace.gradeCount}</div>
                <div className="camping-info">
                  ・리뷰({campingPlace.reviewCount})
                </div>
              </div>

              <div className="camping-info">
                예약자 수({campingPlace.reviewCount})
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainCampingList;
