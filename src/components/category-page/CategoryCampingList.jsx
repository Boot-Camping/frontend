import React from "react";
import { Link, useParams } from "react-router-dom";
import "../category-page/CategoryCampingList.css";
import { ReactSVG } from "react-svg";
import useCampingPlaceFilter from "../../hooks/useCampingPlaceFilter";
import useCategoryFilter from "../../hooks/useCategoryFilter";
import { svgCollection } from "../../constants/svgCollection";
import useWishlist from "../../hooks/useWishlist";

const CategoryCampingList = () => {
  const { category } = useParams();
  const categoryTitle = category || "전체";

  const params = {
    category: categoryTitle !== "전체" ? categoryTitle : undefined,
  };

  const queryString = new URLSearchParams(params).toString();

  const { campingPlaces, error } = useCategoryFilter(
    queryString,
    categoryTitle
  );
  const { isSaved, toggleWishlist } = useWishlist(campingPlaces);

  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(campingPlaces);

  if (error) return <div>Error: {error}</div>;
  return (
    <div className="category-wrapper ">
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

      <div className="category-camping-list-wrapper">
        {campingPlaceFiltered.map((campingPlace, index) => (
          <div key={campingPlace.id} className="category-camping-list">
            <Link to={`/camping/detail/${campingPlace.id}`}>
              <img
                className="category-camping-img"
                src={campingPlace.imageUrls[0] || "default-image-url.jpg"}
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
                <div className="category-camping-name">{campingPlace.name}</div>
                <div className="category-camping-price">
                  {campingPlace.price}원
                </div>
              </div>
              <div className="category-camping-addr-wrapper">
                <div className="category-camping-addr-icon-wrapper">
                  <ReactSVG
                    className="category-camping-addr-icon"
                    src={svgCollection.location}
                    alt="위치"
                  />
                  <div className="category-camping-addr">
                    {campingPlace.addr}
                  </div>
                </div>
                <div className="category-camping-people">
                  기준인원/{campingPlace.standardNum}
                </div>
              </div>
              <div className="category-camping-info-icons-wrapper">
                <div className="category-camping-info-star-wrapper">
                  <ReactSVG
                    className="category-camping-info-star"
                    src={svgCollection.stars}
                    alt=""
                  />
                  <div className="category-camping-info">
                    {campingPlace.averageGrade}
                  </div>
                  <div className="category-camping-info">
                    ・리뷰({campingPlace.reviewCount})
                  </div>
                </div>
                <div className="category-camping-info">
                  예약({campingPlace.reservedDateCount})
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCampingList;
