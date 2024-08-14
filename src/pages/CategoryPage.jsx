import React, { useState, useEffect } from "react";
import "../css/CategoryPage.css";

const campingPlace = [
  {
    id: 1,
    name: "캠프 그라운드 화온",
    price: "40,000~",
    people: "기준2인/최대6인",
    location: "충북 논산시",
    type: "오토캠핑",
    rating: 5.0,
    reviews: 123,
    heart: 89,
    reservations: 168,
    img: "https://campingagains3.s3.ap-northeast-2.amazonaws.com/small_C1_d5d87fe452.jpg",
  },
  {
    id: 2,
    name: "평창힐링캠핑",
    price: "60,000~",
    people: "기준4인/최대8인",
    location: "강원 평창군",
    type: "글램핑",
    rating: 2,
    reviews: 98,
    heart: 189,
    reservations: 200,
    img: "https://campingagains3.s3.ap-northeast-2.amazonaws.com/small_C1_d5d87fe452.jpg",
  },
  {
    id: 3,
    name: "가평 리버뷰 캠핑장",
    price: "55,000~",
    people: "기준2인/최대6인",
    location: "경기 가평군",
    type: "카라반",
    rating: 3,
    reviews: 110,
    heart: 91,
    reservations: 140,
    img: "https://campingagains3.s3.ap-northeast-2.amazonaws.com/small_C1_d5d87fe452.jpg",
  },
  {
    id: 4,
    name: "제주 오션뷰 캠핑",
    price: "70,000~",
    people: "기준4인/최대8인",
    location: "제주 제주시",
    type: "오토캠핑",
    rating: 4,
    reviews: 89,
    heart: 39,
    reservations: 190,
    img: "https://campingagains3.s3.ap-northeast-2.amazonaws.com/small_C1_d5d87fe452.jpg",
  },
  {
    id: 5,
    name: "남해 해양 캠핑장",
    price: "45,000~",
    people: "기준2인/최대6인",
    location: "경남 남해군",
    type: "차박",
    rating: 1,
    reviews: 77,
    heart: 221,
    reservations: 115,
    img: "https://campingagains3.s3.ap-northeast-2.amazonaws.com/small_C1_d5d87fe452.jpg",
  },
];

const CategoryPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("reservation");
  const [campingPlaceFiltered, setCampingPlaceFiltered] =
    useState(campingPlace);

  useEffect(() => {
    let campingPlaceSorted = [...campingPlace];
    if (selectedFilter === "reservation") {
      campingPlaceSorted.sort((a, b) => b.reservations - a.reservations);
    } else if (selectedFilter === "review") {
      campingPlaceSorted.sort((a, b) => b.reviews - a.reviews);
    } else if (selectedFilter === "star") {
      campingPlaceSorted.sort((a, b) => b.rating - a.rating);
    } else if (selectedFilter === "hart") {
      campingPlaceSorted.sort((a, b) => b.heart - a.heart);
    }
    setCampingPlaceFiltered(campingPlaceSorted);
  }, [selectedFilter]);

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
          <img
            className="category-camping-img"
            src={campingPlace.img}
            alt={campingPlace.name}
          />
          <img
            className="category-camping-img-heart"
            src="/assets/heart.svg"
            alt="찜"
          />
          <div className="category-camping-type">{campingPlace.type}</div>
          <div className="category-camping-sub-title-wraper">
            <div className="category-camping-name">{campingPlace.name}</div>
            <div className="category-camping-price">{campingPlace.price}</div>
          </div>
          <div className="category-camping-location-wraper">
            <div className="category-camping-location-box">
              <img
                className="category-camping-location-icon"
                src="/assets/location.svg"
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
              <img
                className="category-camping-info-star"
                src="/assets/star.svg"
                alt="별점"
              />
              <div className="category-camping-info">{campingPlace.rating}</div>
              <div className="category-camping-info">
                ・리뷰({campingPlace.reviews})
              </div>
            </div>
            <div className="category-camping-info-heart-wraper">
              <img
                className="category-camping-info-heart"
                src="/assets/heart.svg"
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
