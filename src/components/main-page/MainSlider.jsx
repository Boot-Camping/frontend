import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../main-page/MainSlider.css";
import useFetchCampingList from "../../hooks/useFetchCampingList";

const MainSlider = () => {
  const { campingPlaces } = useFetchCampingList();

  const newCampingPlace = campingPlaces.length > 0 ? campingPlaces[0] : null;

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
        {newCampingPlace && (
          <SwiperSlide>
            <img
              className="slider-img"
              src={newCampingPlace.imageUrls}
              alt=""
            />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default MainSlider;
