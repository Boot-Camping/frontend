import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../main-page/MainSlider.css";
import useFetchCampingList from "../../hooks/useFetchCampingList";

const MainSlider = () => {
  const { campingPlaces } = useFetchCampingList(0, 5);

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
        {campingPlaces.length > 0 ? (
          campingPlaces.map((campingPlace, index) => (
            <SwiperSlide key={index}>
              <img
                src={campingPlace.imageUrls[0]}
                className="slider-img"
                alt=""
              />
            </SwiperSlide>
          ))
        ) : (
          <div className="no-data-message">등록된 캠핑장소가 없습니다.</div>
        )}
      </Swiper>
    </div>
  );
};

export default MainSlider;
