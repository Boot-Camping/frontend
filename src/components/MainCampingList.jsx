import React from "react";
import { Link } from "react-router-dom";
import "../css/MainCampingList.css";
import { campingPlace } from "../constants/campingPlace";
import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";

const MainCampingList = () => {
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(campingPlace);

  return (
    <>
      <div className="camping-title-wraper">
        <div className="camping-title">캠핑장 리스트</div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="reservation">예약 많은 순</option>
          <option value="review">리뷰 많은순</option>
          <option value="star">평점 좋은 순</option>
          <option value="heart">찜 많은 순</option>
        </select>
      </div>

      <div className="camping-list-wraper">
        {campingPlaceFiltered.map((campingPlace) => (
          <div key={campingPlace.id} className="camping-list">
            <Link to={"/detail"}>
              <img
                className="camping-img"
                src={campingPlace.img}
                alt={campingPlace.name}
              />
              <img
                className="camping-img-heart"
                src="/assets/heart.svg"
                alt=""
              />
              <div className="camping-name">{campingPlace.name}</div>
              <div className="camping-sub-title-wraper">
                <div className="camping-type">{campingPlace.type}</div>
                <div className="camping-price">{campingPlace.price}</div>
              </div>
            </Link>
            <div className="camping-info-icons-wraper">
              <div className="camping-info-star-wraper">
                <img
                  className="camping-info-star"
                  src="/assets/star.svg"
                  alt=""
                />
                <div className="camping-info">{campingPlace.rating}</div>
                <div className="camping-info">
                  ・리뷰({campingPlace.reviews})
                </div>
              </div>
              <div className="camping-info-heart-wraper">
                <img
                  className="camping-info-heart"
                  src="/assets/heart.svg"
                  alt=""
                />
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
