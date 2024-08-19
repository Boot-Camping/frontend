import React from "react";
import DetailPageInfo from "../components/detail-page/DetailPageInfo";
import ReviewPage from "../components/detail-page/ReviewPage";
import BookButton from "../components/detail-page/BookButton";
import ImageSlider from "../components/detail-page/ImageSlider";
import KakaoMap from "../components/detail-page/KakaoMap";

import { sliderData } from "../constants/sliderData";

import "../components/detail-page/DetailPage.css";

const DetailPage = () => {
  return (
    <div>
      <ImageSlider sliderData={sliderData} />
      <DetailPageInfo />
      <KakaoMap address="서울 용산구 한강대로 405" />
      <ReviewPage />
      <BookButton to="/book" />
    </div>
  );
};

export default DetailPage;
