import React from "react";
import "../css/MainSlider.css";

const MainSlider = () => {
  return (
    <div>
      <div className="slider-title">새로 등록된 캠핑장소</div>
      <img
        className="slider-img"
        src="https://campingagains3.s3.ap-northeast-2.amazonaws.com/6_1_974d4b410d.png"
        alt=""
      />
    </div>
  );
};

export default MainSlider;
