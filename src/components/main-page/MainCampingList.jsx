import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "../main-page/MainCampingList.css";
import { ReactSVG } from "react-svg";
import useHeartClick from "../../hooks/useHeartClick";
import useCampingPlaceFilter from "../../hooks/useCampingPlaceFilter";
import useFetchCampingList from "../../hooks/useFetchCampingList";
import { svgCollection } from "../../constants/svgCollection";

const MainCampingList = () => {
  const { campingPlaces, error } = useFetchCampingList();

  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(campingPlaces);

  const { heartClick, heartClickHandler } = useHeartClick([]);

  const slidesPerPage = 10;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="camping-title-wrapper">
        <div className="camping-title">캠핑장 리스트</div>
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

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {Array.from({
          length: Math.ceil(campingPlaceFiltered.length / slidesPerPage),
        }).map((_, pageIndex) => (
          <SwiperSlide key={pageIndex}>
            <div className="camping-list-wrapper">
              {campingPlaceFiltered
                .slice(
                  pageIndex * slidesPerPage,
                  (pageIndex + 1) * slidesPerPage
                )
                .map((campingPlace, index) => (
                  <div key={campingPlace.id} className="camping-list">
                    <Link to={`/camping/detail/${campingPlace.id}`}>
                      <img
                        className="camping-img"
                        src={campingPlace.imageUrls}
                        alt={campingPlace.name}
                      />

                      <ReactSVG
                        className={`camping-img-heart ${
                          !heartClick[index] && "camping-img-heart-delete"
                        }`}
                        src={svgCollection.heart}
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
                        <div className="camping-price">
                          {campingPlace.price}원
                        </div>
                      </div>
                    </Link>
                    <div className="camping-info-icons-wrapper">
                      <div className="camping-info-star-wrapper">
                        <ReactSVG
                          className="camping-info-star"
                          src={svgCollection.stars}
                          alt=""
                        />
                        <div className="camping-info">
                          {campingPlace.averageGrade}
                        </div>
                        <div className="camping-info">
                          ・리뷰({campingPlace.reviewCount})
                        </div>
                      </div>

                      <div className="camping-info">
                        예약자 수({campingPlace.reservedDateCount})
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MainCampingList;
