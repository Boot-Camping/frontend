import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../main-page/MainSlider.css";
import useFetchCampingList from "../../hooks/useFetchCampingList";

const MainSlider = () => {
  const { campingPlaces } = useFetchCampingList();

  return (
    <div>
      <div className="slider-title">새로 등록된 캠핑장소</div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="slider-main"
      >
        {campingPlaces.map((campingPlace, index) => (
          <SwiperSlide key={index}>
            <img
              src={campingPlace.imageUrls[0]}
              className="slider-img"
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainSlider;
