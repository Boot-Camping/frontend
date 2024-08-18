import React, { useState, useEffect } from "react";
import "../components/category-page/CategoryPage.css";
import { campingPlaceData } from "../constants/campingPlaceData";
import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";
import heart from "../assets/svg/heart.svg";
import location from "../assets/svg/location.svg";
import star from "../assets//svg/star.svg";
import { ReactSVG } from "react-svg";

const CategoryPage = () => {
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(campingPlaceData);
  return (
    <>
      <div className="category-title-wraper">
        <div className="category-title">전체</div>
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

      {campingPlaceFiltered.map((campingPlace) => (
        <div key={campingPlace.id} className="category-camping-list">
          <img className="category-camping-img" src={campingPlace.img} alt="" />
          <ReactSVG
            className="category-camping-img-heart"
            src={heart}
            alt="찜"
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
