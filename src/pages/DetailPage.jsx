import React from "react";
import DetailPageInfo from "./DetailPageInfo";
import ReviewPage from "../components/ReviewPage";
import BookButton from "../components/BookButton";
import ImageSlider from "../components/imageSlider/ImageSlider";

import "../css/DetailPage.css";

const sliderData = [
  "./assets/detailImg-1.png",
  "./assets/detailImg-2.png",
  "./assets/detailImg-3.png",
  "./assets/detailImg-4.png",
  "./assets/detailImg-5.png",
  "./assets/detailImg-6.png",
];

const DetailPage = () => {
  return (
    <div className="detail-page">
      <ImageSlider sliderData={sliderData} />
      <DetailPageInfo />
      <ReviewPage />
      <BookButton to="/book" />
    </div>
  );
};

export default DetailPage;
