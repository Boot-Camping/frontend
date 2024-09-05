import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../main-page/MainCampingList.css";
import { ReactSVG } from "react-svg";
import useCampingPlaceFilter from "../../hooks/useCampingPlaceFilter";
import useFetchCampingList from "../../hooks/useFetchCampingList";
import { svgCollection } from "../../constants/svgCollection";
import useWishlist from "../../hooks/useWishlist";

const MainCampingList = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 12;
  const { campingPlaces, error, totalPages } = useFetchCampingList(
    pageNumber,
    pageSize
  );
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(campingPlaces);
  const { isSaved, toggleWishlist } = useWishlist(campingPlaces);

  if (error) return <div>Error: {error}</div>;

  const handleSlideChange = (swiper) => {
    const newPageNumber = swiper.activeIndex;
    setPageNumber(newPageNumber);
  };

  return (
    <div className="main-camping-list underline">
      <div className="camping-title-wrapper">
        <div className="camping-title">캠핑장 리스트</div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="main-select-box"
        >
          <option value="updatedAt">최근 등록 순</option>
          <option value="reservedDateCount">예약 많은 순</option>
          <option value="reviewCount">리뷰 많은 순</option>
          <option value="averageGrade">평점 좋은 순</option>
        </select>
      </div>

      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}
      >
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <SwiperSlide key={pageIndex}>
            <div className="camping-list-wrapper">
              {campingPlaceFiltered
                .slice(0, pageSize)
                .map((campingPlace, index) => (
                  <div key={campingPlace.id} className="camping-list">
                    <Link to={`/camping/detail/${campingPlace.id}`}>
                      <img
                        className="camping-img"
                        src={
                          campingPlace.imageUrls[0] || "default-image-url.jpg"
                        }
                        alt=""
                      />
                      <ReactSVG
                        className={`camping-img-heart ${
                          !isSaved[index] && "camping-img-heart-delete"
                        }`}
                        src={svgCollection.heart}
                        alt=""
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(index, campingPlace);
                        }}
                      />

                      <div className="camping-name">{campingPlace.name}</div>
                      <div className="camping-sub-title-wrapper">
                        <div className="camping-type">
                          {campingPlace.categories.join(", ")}
                        </div>
                        <div className="camping-price">
                          {campingPlace.price}원
                        </div>
                      </div>

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
                    </Link>
                  </div>
                ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainCampingList;
