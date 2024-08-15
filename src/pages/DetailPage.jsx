import React from "react";
import DetailPageInfo from "../components/detail-page/DetailPageInfo";
import ReviewPage from "../components/detail-page/ReviewPage";
import BookButton from "../components/book-page/BookButton";
import ImageSlider from "../components/detail-page/ImageSlider";
import { sliderData } from "../constants/sliderData";

import "../components/detail-page/DetailPage.css";

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
