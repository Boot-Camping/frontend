import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "../category-page/CategoryCampingList.css";
import { ReactSVG } from "react-svg";
import useCampingPlaceFilter from "../../hooks/useCampingPlaceFilter";
import useCategoryFilter from "../../hooks/useCategoryFilter";
import { svgCollection } from "../../constants/svgCollection";
import useWishlist from "../../hooks/useWishlist";

const CategoryCampingList = () => {
  const { categories } = useParams();
  const categoryTitle = categories || "전체";
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 12;

  const { campingPlaces, error, totalPages } = useCategoryFilter(
    categoryTitle,
    pageNumber,
    pageSize
  );
  const { isSaved, toggleWishlist } = useWishlist(campingPlaces);
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(campingPlaces);

  if (error) return <div>Error: {error}</div>;

  const slideChangeHandle = (swiper) => {
    const newPageNumber = swiper.activeIndex;
    setPageNumber(newPageNumber);
  };

  return (
    <div className="category-wrapper">
      <div className="category-title-wrapper">
        <div className="category-title">{categoryTitle}</div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="category-select-box"
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
        onSlideChange={slideChangeHandle}
      >
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <SwiperSlide key={pageIndex}>
            <div className="category-camping-list-wrapper">
              {campingPlaceFiltered
                .slice(0, pageSize)
                .map((campingPlace, index) => (
                  <div key={campingPlace.id} className="category-camping-list">
                    <Link to={`/camping/detail/${campingPlace.id}`}>
                      <img
                        className="category-camping-img"
                        src={
                          campingPlace.imageUrls[0] || "default-image-url.jpg"
                        }
                        alt=""
                      />
                      <ReactSVG
                        className={`category-camping-img-heart ${
                          !isSaved[index] && "category-camping-img-heart-delete"
                        }`}
                        src={svgCollection.heart}
                        alt=""
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(index, campingPlace);
                        }}
                      />
                      <div className="category-camping-type">
                        {campingPlace.categories.join(", ")}
                      </div>
                      <div className="category-camping-sub-title-wrapper">
                        <div className="category-camping-name">
                          {campingPlace.name}
                        </div>
                        <div className="category-camping-price">
                          {campingPlace.price.toLocaleString()}원
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

export default CategoryCampingList;
