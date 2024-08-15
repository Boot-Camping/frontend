// import React from "react";
// import "../main-page/MainReview.css";
// import { mainReviewData } from "../../constants/mainReviewData";

// const MainReview = () => {
//   return (
//     <>
//       <div className="main-review-title">실시간 리뷰</div>
//       {mainReviewData.map((review) => (
//         <div className="main-review-wraper" key={review.id}>
//           <img className="main-review-img" src={review.img} alt="" />
//           <div>
//             <div className="main-review-text">{review.text}</div>
//             <div className="main-review-time">{review.time}</div>
//             <div className="main-review-place">{review.place}</div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default MainReview;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid } from "swiper/modules";
import "../main-page/MainReview.css";
import { mainReviewData } from "../../constants/mainReviewData";

const MainReview = () => {
  return (
    <>
      <div className="main-review-title">실시간 리뷰</div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Grid]}
        className="main-review-slider"
        slidesPerView={1} // 한 번에 1개의 슬라이드만 보이도록 설정
        grid={{
          rows: 1,
          // fill: "row",
        }} // 1개의 행으로 설정
        spaceBetween={20} // 슬라이드 사이 간격
      >
        {mainReviewData.map((review, index) => (
          <SwiperSlide key={index} className="main-review-wraper">
            <img className="main-review-img" src={review.img} alt="" />
            <div>
              <div className="main-review-text">{review.text}</div>
              <div className="main-review-time">{review.time}</div>
              <div className="main-review-place">{review.place}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MainReview;
