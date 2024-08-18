import React from "react";
import "../detail-page/DetailPage.css";

import reviewImg from "../../assets/image/detailImg-1.png";

const ReviewPage = () => {
  return (
    <>
      <div className="review">
        <div className="review-title">리뷰</div>

        <div className="review-info">
          <img className="review-img" src={reviewImg} alt="" />
          <div className="writer">
            <div className="id">camper123</div>
            <div className="date">2024.08-12</div>
          </div>
        </div>

        <div className="content">
          수영장이 유아풀이 아니라 아이 어른 모두 즐겁게 놀기 좋은 곳이에요!
          수도권에서도 멀지 않아서 좋고요특히 시설은 말할것도 없습니다! 각
          시설마다 에어컨이 설치되어 있어서 습한날에도 꿉꿉함 없이 이용할 수
          있어서 폭염에도 잘 지내다 왔어요!
        </div>

        <div className="review-tag"></div>
      </div>
    </>
  );
};

export default ReviewPage;
