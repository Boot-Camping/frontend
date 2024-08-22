import React from "react";
import { Link } from "react-router-dom";
import "../main-page/MainCampingList.css";
import { campingPlaceData } from "../../constants/campingPlaceData";
import useCampingPlaceFilter from "../../hooks/useCampingPlaceFilter";
import heart from "../../assets/svg/heart.svg";
import star from "../../assets/svg/star.svg";
import { ReactSVG } from "react-svg";

const MainCampingList = () => {
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(campingPlaceData);

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
            <Link to={"/camping/detail"}>
              <img className="camping-img" src={campingPlace.img} alt="" />
              <ReactSVG className="camping-img-heart" src={heart} alt="" />
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
